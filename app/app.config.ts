export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
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
