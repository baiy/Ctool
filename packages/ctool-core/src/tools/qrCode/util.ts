import {CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, Gradient, Options} from "qr-code-styling";
import Text from "@/helper/text";
import {cloneDeep} from "lodash";

export interface GenerateColor {
    is_gradient: boolean
    simple: string,
    gradient: Gradient & { rotation: number }
}

export const defaultGenerateColor = (color: string): GenerateColor => {
    return {
        is_gradient: false,
        simple: color,
        gradient: {
            type: "linear",
            rotation: 0,
            colorStops: [
                {
                    offset: 0,
                    color: color,
                },
                {
                    offset: 1,
                    color: color,
                }
            ]
        }

    }
}

export const defaultGenerateOption = (): GenerateOptions => {
    return {
        tab: "common",
        is_show: false,
        width: 280,
        height: 280,
        margin: 10,
        error_correction_level: "Q",
        image_options: {
            size: 4,
            margin: 4,
        },
        dots_options: {
            type: "square",
            color: defaultGenerateColor("#000000"),
        },
        corners_square_options: {
            type: "square",
            color: defaultGenerateColor("#000000"),
        },
        corners_dot_options: {
            type: "square",
            color: defaultGenerateColor("#000000"),
        },
        background_options: {
            color: defaultGenerateColor("#ffffff"),
        }
    }
}
export type GenerateOptions = {
    tab: string
    is_show: boolean
    width: number;
    height: number;
    margin: number;
    error_correction_level: string;
    image_options: {
        size: number;
        margin: number;
    };
    dots_options: {
        type: string;
        color: GenerateColor;
    };
    corners_square_options: {
        type: string;
        color: GenerateColor;
    };
    corners_dot_options: {
        type: string;
        color: GenerateColor;
    };
    background_options: {
        color: GenerateColor;
    };
};

const generateOptionsColorHandle = (option: GenerateColor) => {
    if (!option.is_gradient) {
        return {color: option.simple, gradient: undefined}
    }
    option.gradient.rotation = (option.gradient?.rotation || 0) / 180 * Math.PI;
    return {gradient: option.gradient, color: undefined}
}

export const generateOptionsHandle = (_option: GenerateOptions, data: string, image: Text): Options => {
    const option = !_option.is_show ? defaultGenerateOption() : cloneDeep(_option)
    return {
        data,
        width: option.width,
        height: option.height,
        margin: option.margin,
        qrOptions: {
            errorCorrectionLevel: option.error_correction_level as ErrorCorrectionLevel,
            multibyte: "UTF-8",
        },
        image: option.image_options.size > 0 && image.isImage() ? image.toDataUrl() : "",
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: option.image_options.size / 10,
            margin: option.image_options.margin,
        },
        dotsOptions: {
            type: option.dots_options.type as DotType,
            ...generateOptionsColorHandle(option.dots_options.color)
        },
        cornersSquareOptions: {
            type: option.corners_square_options.type as CornerSquareType,
            ...generateOptionsColorHandle(option.corners_square_options.color)
        },
        cornersDotOptions: {
            type: option.corners_dot_options.type as CornerDotType,
            ...generateOptionsColorHandle(option.corners_dot_options.color)
        },
        backgroundOptions: {
            ...generateOptionsColorHandle(option.background_options.color)
        }
    }
}
