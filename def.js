// JavaScript
define(function () {
   
   return {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
						uses: "dimensions",
						min:2,
						max:3
					},
					measures: {
						uses: "measures",
						max:1
					},
						MyAccordion: {
				type: "items",
				label: "Core",
				 items: {
        header1: {
            type: "string",
            label: "Text",
			ref:"cond",
			expression: "optional",
			defaultValue:"Main"
        },
		header2: {
            type: "string",
            label: "Label",
			ref:"cond2",
			expression: "optional",
			defaultValue:""
        }

    }
			},
				MyAccordion2: {
				type: "items",
				label: "Tooltip",
				 items: {
        header1: {
            type: "string",
            label: "Text",
			ref:"tooltip",
			expression: "optional",
			defaultValue:`='<table style="width:100%;border: 1px solid black;">
<tr>
  <th align="left" style="border: 1px solid black;">{dimlabel} </th>
  <td style="border: 1px solid black;">{dimvalue}</td>
</tr>
<tr>
  <th align="left" style="border: 1px solid black;">{measlabel}</th>
  <td style="border: 1px solid black;">{value}</td>
</tr>
</table>'`
        }

    }
			}
					,
					sorting: {
						uses: "sorting"
					},
					appearance: {
						uses: "settings"
					}
				}
			}
});