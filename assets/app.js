import { groups, pointsExample } from './docs.js';
import { escapeHtml, highlight } from './highlight.js';

const cdn = 'https://cdn.jsdelivr.net/npm';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ---------------------------------------------------------------------------
// API reference

const renderFunction = (fn) => {
    const title = fn.title
        ? `<span class="fn-name">${fn.title}</span>`
        : `<code><span class="fn-name">${fn.name}</span><span class="fn-params">${escapeHtml(
              fn.signature.slice(fn.signature.indexOf('('))
          )}</span></code>`;

    return `
        <article class="fn" id="${fn.name}" aria-labelledby="${fn.name}-title">
            <h3 class="fn-title" id="${fn.name}-title"><a href="#${fn.name}">${title}</a></h3>
            ${fn.title ? `<p class="fn-exports"><code>${escapeHtml(fn.signature)}</code></p>` : ''}
            <div class="fn-description">${fn.description}</div>
            <div data-example="${fn.name}"></div>
        </article>`;
};

const renderApi = () => {
    document.querySelector('[data-api]').innerHTML = groups
        .map(
            (group) => `
            <section class="doc-group" id="${group.id}" aria-labelledby="${group.id}-title">
                <h2 id="${group.id}-title">${group.title}</h2>
                ${group.intro ? `<p class="group-intro">${group.intro}</p>` : ''}
                ${group.functions.map(renderFunction).join('')}
            </section>`
        )
        .join('');
};

// ---------------------------------------------------------------------------
// Running examples

const createRunner = () => {
    const timeout = 2000;
    const pending = new Map();
    let worker;
    let ready;
    let failed = false;
    let nextId = 0;

    const start = () => {
        worker = new Worker(new URL('./runner.js', import.meta.url));
        ready = new Promise((resolve) => {
            worker.addEventListener('message', ({ data }) => {
                if (data.status === 'ready') {
                    resolve();
                    return;
                }

                const job = pending.get(data.id);
                if (job) {
                    pending.delete(data.id);
                    clearTimeout(job.timer);
                    job.resolve(data);
                }
            });

            worker.addEventListener('error', () => {
                failed = true;
                resolve();
            });
        });
    };

    const post = async (code) => {
        await ready;

        if (failed) {
            return {
                status: 'error',
                message: 'The examples could not be started. Reload the page to try again.',
                logs: [],
            };
        }

        const id = nextId++;

        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                pending.delete(id);
                restart();
                resolve({
                    status: 'error',
                    message: `The example ran for more than ${timeout / 1000} seconds and was stopped.`,
                    logs: [],
                });
            }, timeout);

            pending.set(id, { resolve, timer, code });
            worker.postMessage({ id, code });
        });
    };

    // Terminating the worker is the only way to stop an endless loop.
    // Examples that were waiting behind it run again in the new worker.
    const restart = () => {
        worker.terminate();
        const waiting = [...pending.values()];
        pending.clear();
        start();

        for (const job of waiting) {
            clearTimeout(job.timer);
            post(job.code).then(job.resolve);
        }
    };

    start();

    return post;
};

const run = createRunner();

const createExample = (container, { name, code: originalCode }) => {
    container.className = 'example';
    container.innerHTML = `
        <div class="example-editor">
            <pre class="example-highlight" aria-hidden="true"><code></code></pre>
            <textarea class="example-input" spellcheck="false" autocapitalize="off" autocomplete="off"
                aria-label="Example code for ${name}. Edit it to see a different result."></textarea>
        </div>
        <div class="example-output">
            <div class="example-output-header">
                <span class="example-output-label">Result</span>
                <button type="button" class="example-reset" hidden>Reset example</button>
            </div>
            <div class="example-logs"></div>
            <pre class="example-result"><code>…</code></pre>
        </div>`;

    const input = container.querySelector('.example-input');
    const highlighted = container.querySelector('.example-highlight code');
    const output = container.querySelector('.example-output');
    const label = container.querySelector('.example-output-label');
    const logs = container.querySelector('.example-logs');
    const result = container.querySelector('.example-result code');
    const reset = container.querySelector('.example-reset');

    let latestRun = 0;
    let debounce;

    // The trailing newline keeps the highlighted copy as tall as the
    // textarea when the code ends with an empty line
    const sync = () => {
        highlighted.innerHTML = `${highlight(input.value)}\n`;
        reset.hidden = input.value === originalCode;
    };

    const execute = async () => {
        clearTimeout(debounce);
        const runId = ++latestRun;
        const response = await run(input.value);

        // A newer run has started in the meantime
        if (runId !== latestRun) {
            return;
        }

        const isError = response.status === 'error';
        output.classList.toggle('is-error', isError);
        label.textContent = isError ? 'Error' : 'Result';
        logs.innerHTML = response.logs.map((line) => `<div>${escapeHtml(line)}</div>`).join('');

        const hideResult = !isError && response.logs.length > 0 && response.result === 'undefined';
        result.parentElement.hidden = hideResult;
        result.innerHTML = isError ? escapeHtml(response.message) : highlight(response.result);
    };

    input.value = originalCode;
    sync();

    input.addEventListener('input', () => {
        // Results are only announced once someone edits the example, not
        // while the examples run for the first time during scrolling
        output.setAttribute('aria-live', 'polite');
        sync();
        clearTimeout(debounce);
        debounce = setTimeout(execute, 350);
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            execute();
        }
    });

    reset.addEventListener('click', () => {
        input.value = originalCode;
        sync();
        execute();
        input.focus();
    });

    return execute;
};

const setupExamples = () => {
    const examples = new Map(
        groups.flatMap((group) => group.functions).map((fn) => [fn.name, fn])
    );
    examples.set(pointsExample.name, pointsExample);

    const runners = new WeakMap();

    // Examples run when they get close to the viewport
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    runners.get(entry.target)();
                }
            }
        },
        { rootMargin: '600px 0px' }
    );

    for (const container of document.querySelectorAll('[data-example]')) {
        runners.set(container, createExample(container, examples.get(container.dataset.example)));
        observer.observe(container);
    }
};

// ---------------------------------------------------------------------------
// Static code snippets and copy buttons

const highlightSnippets = () => {
    for (const code of document.querySelectorAll('code.language-js')) {
        code.innerHTML = highlight(code.textContent);
    }
};

const setupCopyButtons = () => {
    for (const button of document.querySelectorAll('[data-copy]')) {
        let timer;
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.copy);
                button.textContent = 'Copied';
            } catch {
                button.textContent = 'Copy failed';
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    }
};

const showVersion = async () => {
    try {
        const response = await fetch('https://data.jsdelivr.com/v1/packages/npm/geolib/resolved?specifier=4');
        const { version } = await response.json();
        if (version) {
            document.querySelector('[data-version]').textContent = `v${version}`;
        }
    } catch {
        // The generic "v4" stays
    }
};

// ---------------------------------------------------------------------------
// Table of contents

const setupToc = () => {
    const list = document.querySelector('[data-toc]');
    const details = document.querySelector('.toc-details');
    const scrollContainer = document.querySelector('.toc-body');
    const filter = document.querySelector('.toc-filter input');
    const empty = document.querySelector('.toc-empty');

    const startLinks = [...document.querySelectorAll('#start .doc-heading')].map((heading) => ({
        id: heading.id,
        label: heading.textContent,
    }));

    const tocGroups = [
        { id: 'start', title: 'Getting started', items: startLinks, code: false },
        ...groups.map((group) => ({
            id: group.id,
            title: group.title,
            items: group.functions.map((fn) => ({ id: fn.name, label: fn.title ?? fn.name })),
            code: true,
        })),
    ];

    list.innerHTML = tocGroups
        .map(
            (group) => `
            <li class="toc-group">
                <a class="toc-group-link" href="#${group.id}">${group.title}</a>
                <ol>
                    ${group.items
                        .map(
                            (item) =>
                                `<li><a href="#${item.id}" class="${group.code && item.id !== 'constants' ? 'is-code' : ''}">${item.label}</a></li>`
                        )
                        .join('')}
                </ol>
            </li>`
        )
        .join('');

    // The contents are always visible next to the docs on wide screens and
    // collapsed above them on small ones
    const wide = window.matchMedia('(min-width: 960px)');
    const updateDetails = () => {
        details.open = wide.matches;
    };
    updateDetails();
    wide.addEventListener('change', updateDetails);

    list.addEventListener('click', (event) => {
        if (event.target.closest('a') && !wide.matches) {
            details.open = false;
        }
    });

    filter.addEventListener('input', () => {
        const query = filter.value.trim().toLowerCase();
        let anyVisible = false;

        for (const group of list.querySelectorAll('.toc-group')) {
            let groupVisible = false;
            for (const item of group.querySelectorAll('ol li')) {
                const visible = item.textContent.toLowerCase().includes(query);
                item.hidden = !visible;
                groupVisible ||= visible;
            }
            group.hidden = !groupVisible;
            anyVisible ||= groupVisible;
        }

        empty.hidden = anyVisible;
    });

    // Highlights the entry of the section that is currently being read
    const links = new Map(
        [...list.querySelectorAll('.toc-group ol a')].map((link) => [link.getAttribute('href').slice(1), link])
    );
    let current;

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting);
            if (visible.length === 0) {
                return;
            }

            const link = links.get(visible[0].target.id);
            if (!link || link === current) {
                return;
            }

            current?.removeAttribute('aria-current');
            link.setAttribute('aria-current', 'location');
            current = link;

            // Keeps the entry visible in the scrollable contents without
            // moving the page
            const linkTop = link.offsetTop - scrollContainer.offsetTop;
            if (
                linkTop < scrollContainer.scrollTop ||
                linkTop > scrollContainer.scrollTop + scrollContainer.clientHeight - 40
            ) {
                scrollContainer.scrollTop = linkTop - scrollContainer.clientHeight / 3;
            }
        },
        { rootMargin: '0px 0px -75% 0px' }
    );

    for (const id of links.keys()) {
        const target = document.getElementById(id);
        if (target) {
            observer.observe(target);
        }
    }
};

// ---------------------------------------------------------------------------
// Globe

const cities = [
    { name: 'Berlin', latitude: 52.52, longitude: 13.405 },
    { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
    { name: 'New York', latitude: 40.7128, longitude: -74.006 },
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Reykjavík', latitude: 64.1466, longitude: -21.9426 },
    { name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
    { name: 'Nairobi', latitude: -1.2921, longitude: 36.8219 },
    { name: 'Cape Town', latitude: -33.9249, longitude: 18.4241 },
    { name: 'Mumbai', latitude: 19.076, longitude: 72.8777 },
    { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
    { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
    { name: 'Auckland', latitude: -36.8485, longitude: 174.7633 },
    { name: 'Honolulu', latitude: 21.3069, longitude: -157.8583 },
    { name: 'Anchorage', latitude: 61.2181, longitude: -149.9003 },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { name: 'Lima', latitude: -12.0464, longitude: -77.0428 },
    { name: 'São Paulo', latitude: -23.5505, longitude: -46.6333 },
    { name: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816 },
];

const pickedName = 'Picked point';

const setupGlobe = async () => {
    const svg = document.getElementById('globe');
    const frame = svg.parentElement;

    let geolib;
    let d3;
    let land;

    try {
        let topojson;
        let topology;
        [geolib, d3, topojson, topology] = await Promise.all([
            import(`${cdn}/geolib@4/+esm`),
            import(`${cdn}/d3-geo@3.1.1/+esm`),
            import(`${cdn}/topojson-client@3.1.0/+esm`),
            fetch(`${cdn}/world-atlas@2.0.2/land-110m.json`).then((response) => response.json()),
        ]);
        land = topojson.feature(topology, topology.objects.land);
    } catch {
        frame.classList.add('is-failed');
        frame.insertAdjacentHTML(
            'beforeend',
            '<p class="globe-error">The globe needs cdn.jsdelivr.net, which could not be reached.</p>'
        );
        return;
    }

    const size = 560;
    const radius = size / 2 - 6;
    const projection = d3
        .geoOrthographic()
        .scale(radius)
        .translate([size / 2, size / 2])
        .clipAngle(90)
        .precision(0.2);
    const path = d3.geoPath(projection);
    const graticule = d3.geoGraticule10();

    const create = (name, attributes, parent = svg) => {
        const element = document.createElementNS('http://www.w3.org/2000/svg', name);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        parent.append(element);
        return element;
    };

    svg.querySelector('.globe-placeholder').remove();
    const spherePath = create('path', { class: 'globe-sphere' });
    const graticulePath = create('path', { class: 'globe-graticule' });
    const landPath = create('path', { class: 'globe-land' });
    const routePath = create('path', { class: 'globe-route', pathLength: 1 });
    const centerMarker = create('circle', { class: 'globe-center', r: 5 });

    const createLabel = (className) => {
        const group = create('g', { class: `globe-marker ${className}` });
        create('circle', { r: 6 }, group);
        const text = create('text', { dy: '-0.9em' }, group);
        return { group, text };
    };

    const markers = { from: createLabel('is-from'), to: createLabel('is-to') };

    const state = { from: cities[0], to: cities[1], unit: 'km' };
    const selects = {
        from: document.getElementById('route-from'),
        to: document.getElementById('route-to'),
    };

    const center = () => {
        const [lambda, phi] = projection.rotate();
        return [-lambda, -phi];
    };

    const toCoordinates = (point) => [point.longitude, point.latitude];

    const place = (element, coordinates) => {
        const visible = d3.geoDistance(coordinates, center()) < Math.PI / 2 - 0.02;
        element.style.display = visible ? '' : 'none';
        if (visible) {
            const [x, y] = projection(coordinates);
            element.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        }
    };

    const draw = () => {
        spherePath.setAttribute('d', path({ type: 'Sphere' }));
        graticulePath.setAttribute('d', path(graticule));
        landPath.setAttribute('d', path(land));
        routePath.setAttribute(
            'd',
            path({
                type: 'LineString',
                coordinates: [toCoordinates(state.from), toCoordinates(state.to)],
            }) ?? ''
        );

        const midpoint = geolib.getCenter([state.from, state.to]);
        place(centerMarker, toCoordinates(midpoint));

        for (const key of ['from', 'to']) {
            const { group, text } = markers[key];
            place(group, toCoordinates(state[key]));
            text.textContent = state[key].name;
            // Labels on the right half point inwards so they don't get cut off
            const [x] = projection(toCoordinates(state[key])) ?? [0];
            text.setAttribute('text-anchor', x > size * 0.68 ? 'end' : x < size * 0.32 ? 'start' : 'middle');
        }
    };

    const formatDistance = (meters) => {
        const value = geolib.convertDistance(meters, state.unit);
        return `${value.toLocaleString('en-US', { maximumFractionDigits: value < 10 ? 2 : 0 })} ${state.unit}`;
    };

    const formatPoint = ({ latitude, longitude }) =>
        `${Math.abs(latitude).toFixed(2)}° ${latitude < 0 ? 'S' : 'N'}, ${Math.abs(longitude).toFixed(2)}° ${longitude < 0 ? 'W' : 'E'}`;

    const results = Object.fromEntries(
        [...document.querySelectorAll('[data-result]')].map((element) => [element.dataset.result, element])
    );

    const updateResults = () => {
        const { from, to } = state;
        const distance = geolib.getDistance(from, to);
        const bearing = geolib.getGreatCircleBearing(from, to);
        const direction = geolib.getCompassDirection(from, to, geolib.getGreatCircleBearing);

        results.distance.textContent = formatDistance(distance);
        results.preciseDistance.textContent = formatDistance(geolib.getPreciseDistance(from, to));
        results.bearing.textContent = distance === 0 ? '–' : `${bearing.toFixed(1)}° (${direction})`;
        results.center.textContent = formatPoint(geolib.getCenter([from, to]));

        svg.setAttribute(
            'aria-label',
            `Globe showing the shortest route from ${from.name} to ${to.name}, ${formatDistance(distance)} long`
        );
    };

    // Rotating the globe

    let animation;

    const rotateTo = ([longitude, latitude]) => {
        projection.rotate([-longitude, -latitude]);
        draw();
    };

    const animateTo = (target) => {
        cancelAnimationFrame(animation);

        if (reducedMotion.matches) {
            rotateTo(target);
            return;
        }

        const interpolate = d3.geoInterpolate(center(), target);
        const duration = 900;
        const startTime = performance.now();

        const step = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            rotateTo(interpolate(eased));
            if (t < 1) {
                animation = requestAnimationFrame(step);
            }
        };

        animation = requestAnimationFrame(step);
    };

    const showRoute = ({ animate }) => {
        updateResults();
        const midpoint = geolib.getCenter([state.from, state.to]);

        if (animate && !reducedMotion.matches) {
            // Restarts the CSS animation that draws the route
            routePath.classList.remove('is-drawing');
            void routePath.getBoundingClientRect();
            routePath.classList.add('is-drawing');
            animateTo(toCoordinates(midpoint));
        } else {
            rotateTo(toCoordinates(midpoint));
        }
    };

    // Selects

    const setSelect = (key) => {
        const select = selects[key];
        const point = state[key];
        const index = cities.indexOf(point);
        let picked = select.querySelector('option[value="picked"]');

        if (index === -1) {
            if (!picked) {
                picked = new Option(pickedName, 'picked');
                select.append(picked);
            }
            select.value = 'picked';
        } else {
            picked?.remove();
            select.value = String(index);
        }
    };

    for (const [key, select] of Object.entries(selects)) {
        select.innerHTML = cities.map((city, index) => `<option value="${index}">${city.name}</option>`).join('');
        setSelect(key);
        select.addEventListener('change', () => {
            if (select.value === 'picked') {
                return;
            }
            state[key] = cities[Number(select.value)];
            setSelect(key);
            showRoute({ animate: true });
        });
    }

    document.getElementById('route-swap').addEventListener('click', () => {
        [state.from, state.to] = [state.to, state.from];
        setSelect('from');
        setSelect('to');
        updateResults();
        draw();
    });

    for (const button of document.querySelectorAll('[data-unit]')) {
        button.addEventListener('click', () => {
            state.unit = button.dataset.unit;
            for (const other of document.querySelectorAll('[data-unit]')) {
                other.setAttribute('aria-pressed', String(other === button));
            }
            updateResults();
        });
    }

    // Dragging turns the globe, a click without dragging moves the
    // destination

    let drag = null;

    const toSvgPoint = (event) => {
        const box = svg.getBoundingClientRect();
        return [((event.clientX - box.left) * size) / box.width, ((event.clientY - box.top) * size) / box.height];
    };

    svg.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) {
            return;
        }
        cancelAnimationFrame(animation);
        svg.setPointerCapture(event.pointerId);
        drag = { x: event.clientX, y: event.clientY, rotation: projection.rotate(), moved: false };
        svg.classList.add('is-dragging');
    });

    svg.addEventListener('pointermove', (event) => {
        if (!drag) {
            return;
        }

        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        drag.moved ||= Math.hypot(dx, dy) > 4;

        if (drag.moved) {
            // Degrees per pixel, so the point under the pointer roughly
            // follows it
            const factor = (180 / Math.PI / radius) * (size / svg.getBoundingClientRect().width);
            projection.rotate([
                drag.rotation[0] + dx * factor,
                Math.max(-90, Math.min(90, drag.rotation[1] - dy * factor)),
            ]);
            draw();
        }
    });

    const endDrag = (event) => {
        if (!drag) {
            return;
        }

        const wasClick = !drag.moved && event.type === 'pointerup';
        drag = null;
        svg.classList.remove('is-dragging');

        if (wasClick) {
            const [x, y] = toSvgPoint(event);
            if (Math.hypot(x - size / 2, y - size / 2) > radius) {
                return;
            }

            const [longitude, latitude] = projection.invert([x, y]);
            state.to = {
                name: pickedName,
                latitude: Math.round(latitude * 10000) / 10000,
                longitude: Math.round(longitude * 10000) / 10000,
            };
            setSelect('to');
            updateResults();
            draw();
        }
    };

    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);

    svg.addEventListener('keydown', (event) => {
        const steps = { ArrowLeft: [10, 0], ArrowRight: [-10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
        const step = steps[event.key];
        if (!step) {
            return;
        }
        event.preventDefault();
        cancelAnimationFrame(animation);
        const [lambda, phi] = projection.rotate();
        projection.rotate([lambda + step[0], Math.max(-90, Math.min(90, phi + step[1]))]);
        draw();
    });

    // Starts above the origin and turns to the route once everything is
    // loaded
    rotateTo(toCoordinates(state.from));
    frame.classList.add('is-ready');
    showRoute({ animate: true });
};

// ---------------------------------------------------------------------------

renderApi();
highlightSnippets();
setupExamples();
setupToc();
setupCopyButtons();
showVersion();
setupGlobe();
