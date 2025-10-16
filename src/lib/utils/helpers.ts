export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function makeBlankImage(minW = 240, maxW = 480, minH = 140, maxH = 320) {
  const w = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
  const h = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
  const color = `hsl(${Math.floor(Math.random() * 360)}, 20%, 85%)`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${color}" rx="12" ry="12" />
  </svg>`;

  return {
    src: "data:image/svg+xml;base64," + btoa(svg),
    width: w,
    height: h
  };
}

export function getProjects(count: number) {
  // import all image/gif assets
	const allImages = import.meta.glob('$lib/assets/p{1,2,3,4,5,6,7,8,9,10,11,12}.{png,jpg,jpeg,bmp,gif}', {
		eager: true,
		import: 'default'
	}) as Record<string, string>

	// build grouped structure like:
	// { p1: { image: '...', gif: '...' }, p2: {...}, ... }
	const grouped: Record<string, { image?: string; gif?: string }> = {}

	for (const [path, url] of Object.entries(allImages)) {
		const match = path.match(/p(\d+)\.(\w+)$/)
		if (!match) continue
		const [, num, ext] = match
		const key = `p${num}`

		if (ext === 'gif') grouped[key] = { ...grouped[key], gif: url }
		else grouped[key] = { ...grouped[key], image: url }
	}

	// pick either the gif or image for each p1–p7	(just doing this for testing)
	// build array of projects
	const projects = Array.from({ length: count }, (_, i) => {
		const key = `p${(i % Object.keys(grouped).length) + 1}` // safely loop if count > total
		const { image, gif } = grouped[key] || {}
		const chosen = gif && image ? (Math.random() < 0.5 ? gif : image) : gif || image || ''

		return {
			src: chosen,
			description:
				i % 2 === 0
					? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					: i % 3 === 0
					? 'Lorema, vel consectetur lacus Lorem ipsum dolor consectetur adipiscing elita elita. Vivamus eleifend maximus elita.'
					: i % 4 === 0
					? 'Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elita. Vivamus eleifend maximus urna.'
					: i % 5 === 0
					? 'Lorem ipsum dolor sit.'
					: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit amet, consectetur adipiscing elit.',
			tags: ['sveltekit', 'typescript', 'tailwind', 'vite', 'node'].slice(
				0,
				Math.floor(Math.random() * 4) + 2
			),
			transition: randomBetween(1, 10)
		}
	})

  return projects
}

export function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (
      node &&
      !node.contains(target) &&
      !target.closest('#menu-toggle') && // 👈 ignore toggle button
      !event.defaultPrevented
    ) {
      node.dispatchEvent(new CustomEvent('click_outside'))
    }
  }

  document.addEventListener('click', handleClick, true)
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}

