import buffer from "buffer"
import process from "process"

window['global'] ||= window;
window['Buffer'] = buffer.Buffer;
window['process'] = process;
