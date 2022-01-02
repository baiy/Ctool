export default (mode) => {
    mode = ['light', 'dark', 'auto'].includes(mode) ? mode : 'light'
    console.log(`set display mode:${mode}`)
    document.getElementsByTagName('html')[0].setAttribute('theme-mode', mode);
}
