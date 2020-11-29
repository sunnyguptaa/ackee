import { useEffect, useState } from 'react'

import { initialSubState } from '../reducers/widgets'

export default (props, createLoader, opts) => {

	const [ widgetIds, setWidgetIds ] = useState([])

	useEffect(() => {

		const widgetIds = props.domains.value.map(
			(domain) => {
				const loader = createLoader(domain.id, opts)
				props.fetchWidget(props, loader)

				return loader.id
			}
		)

		setWidgetIds(widgetIds)

	}, [ props.domains.value, ...Object.values(opts) ])

	return widgetIds.map((widgetId) => {
		const widget = props.widgets.value[widgetId]
		return widget == null ? initialSubState() : widget
	})

}