import xmlFormatter from "xml-formatter"
import Base from "./base";

export const formatter = new (class extends Base<'xml'> {

    async beautify(): Promise<string> {
        return xmlFormatter(this.code, {
            indentation: " ".repeat(this.getOptionValue('tab', 4)),
            collapseContent: this.getOptionValue('collapse_content', false),
            lineSeparator: '\n'
        });
    }

    async compress(): Promise<string> {
        return xmlFormatter(this.code, {
            indentation: '',
            collapseContent: true,
            lineSeparator: ''
        })
    }
})
