// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// declare namespace svelte.JSX {
	// 	interface HTMLAttributes<T> {
	// 		'on:click_outside'?: (event: CustomEvent) => void;
	// 	}
	// }

	declare namespace svelteHTML {
        interface HTMLAttributes {
            'on:remove'?: (event: CustomEvent<{ itemId: string }>) => void;
        }
    }
}

export { };
