import type { Handle } from "@sveltejs/kit"
import { User } from 'database'

export const handle = (async ({ event, resolve }) => {
	const user = new User()
	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			html = html.replaceAll("%apiUrl%", import.meta.env.VITE_RPC_URL)

			return html
		},
	})
}) satisfies Handle
