export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'neutral'
    },
    button: {
      slots: {
        base: ['cursor-pointer']
      }
    },
    dropdownMenu: {
      slots: {
        item: 'cursor-pointer'
      }
    },
    listbox: {
      slots: {
        item: 'cursor-pointer'
      }
    }
  }
})
