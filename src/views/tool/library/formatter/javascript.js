import prettier from "prettier/standalone";
import parser from "prettier/parser-babel";

// https://github.com/mishoo/UglifyJS/issues/4878
// eslint-disable-next-line import/no-unresolved, import/extensions, import/no-webpack-loader-syntax
import UglifyJS from './uglify';
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parser],
        parser: "babel",
        tabWidth: "tab" in option ? option.tab : 4
    });
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    let result = UglifyJS.minify(code, {
        keep_fnames: true,
        compress: false,
        mangle: false,
        output: {
            beautify: false,
        }
    })
    if (!("code" in result) || !result.code){
        throw new Error("compress error:"+JSON.stringify(result.error))
    }
    return result.code
}

export default {
    beautify,compress
}
