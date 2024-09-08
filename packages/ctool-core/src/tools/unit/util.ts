import { create, all } from "mathjs";
const math = create(all, {
    number: "BigNumber",
});

const MAX_NUM = 14;       //格式化后的最长限制
const DECIMAL_NUM = 7;    //四舍五入时小数点后位数
const EXPONENTIAL_NUM = 4; //科学计数法小数点后位数
type ConfigType = {
    key: string,
    main: string,
    unit: {
        key: string,
        unit: string,
        calc: string,
        init: string,
    }[],
    special: { from: string, to: string, func: string }[]
    group: { key: string, list: string[] }[]
}

export const config: ConfigType[] = [
    {
        key: "length",
        main: "m",
        unit: [
            {
                key: "km",
                unit: "km",
                calc: `x / 1000`,
                init: `x * 1000`,
            },
            {
                key: "m",
                unit: "m",
                calc: `x`,
                init: `x`,
            },
            {
                key: "dm",
                unit: "dm",
                calc: `x / 0.1`,
                init: `x * 0.1`,
            },
            {
                key: "cm",
                unit: "cm",
                calc: `x / 0.01`,
                init: `x * 0.01`,
            },
            {
                key: "mm",
                unit: "mm",
                calc: `x / 0.001`,
                init: `(x * 0.001)`,
            },
            {
                key: "um",
                unit: "um",
                calc: `x / 0.000001`,
                init: `x * 0.000001`,
            },
            {
                key: "nm",
                unit: "nm",
                calc: `x / 0.000000001`,
                init: `x * 0.000000001`,
            },
            {
                key: "pm",
                unit: "pm",
                calc: `x / 0.000000000001`,
                init: `x * 0.000000000001`,
            },
            {
                key: "ly",
                unit: "ly",
                calc: `x / 9460730472580800`,
                init: `x * 9460730472580800`,
            },
            {
                key: "au",
                unit: "AU",
                calc: `x / 149597870700`,
                init: `(x * 149600000000)`,
            },
            {
                key: "in",
                unit: "in",
                calc: `x / (0.3048 / 12)`,
                init: `x * (0.3048 / 12)`,
            },
            {
                key: "ft",
                unit: "ft",
                calc: `x / 0.3048`,
                init: `x * 0.3048`,
            },
            {
                key: "yd",
                unit: "yd",
                calc: `x / (0.3048 * 3)`,
                init: `x * (0.3048 * 3)`,
            },
            {
                key: "mi",
                unit: "mi",
                calc: `x / (0.3048 * 3 * 1760)`,
                init: `x * (0.3048 * 3 * 1760)`,
            },
            {
                key: "nmi",
                unit: "nmi",
                calc: `x / 1852`,
                init: `x * 1852`,
            },
            {
                key: "fm",
                unit: "fm",
                calc: `x / 1.8288`,
                init: `x * 1.8288`,
            },
            {
                key: "fur",
                unit: "fur",
                calc: `x / 201.168`,
                init: `x * 201.168`,
            },
            {
                key: "cn_li",
                unit: "li",
                calc: `x / 500`,
                init: `(x * 500)`,
            },
            {
                key: "cn_zhang",
                unit: "zhang",
                calc: `x / (10 / 3)`,
                init: `x * (10 / 3)`,
            },
            {
                key: "cn_chi",
                unit: "chi",
                calc: `x / (1 / 3)`,
                init: `x * (1 / 3)`,
            },
            {
                key: "cn_cun",
                unit: "cun",
                calc: `x / (0.1 / 3)`,
                init: `x * (0.1 / 3)`,
            },
            {
                key: "cn_fen",
                unit: "fen",
                calc: `x / (0.01 / 3)`,
                init: `x * (0.01 / 3)`,
            },
            {
                key: "cn_li2",
                unit: "li",
                calc: `x / (0.001 / 3)`,
                init: `x * (0.001 / 3)`,
            },
            {
                key: "cn_hao",
                unit: "hao",
                calc: `x / (0.0001 / 3)`,
                init: `x * (0.0001 / 3)`,
            },
        ],
        special: [],
        group: [
            {
                key: "metric_system",
                list: ["km", "m", "dm", "cm", "mm", "um", "nm", "pm", "ly", "au"],
            },
            {
                key: "imperial_units",
                list: ["in", "ft", "yd", "mi", "nmi", "fm", "fur"],
            },
            {
                key: "chinese_units",
                list: ["cn_li", "cn_zhang", "cn_chi", "cn_cun", "cn_fen", "cn_li2", "cn_hao"],
            },
        ],
    },
    {
        key: "area",
        main: "m_2",
        unit: [
            {
                key: "km_2",
                unit: "km²",
                calc: `x / 1000000`,
                init: `x * 1000000`,
            },
            {
                key: "ha",
                unit: "ha",
                calc: `x / 10000`,
                init: `x * 10000`,
            },
            {
                key: "are",
                unit: "are",
                calc: `x / 100`,
                init: `x * 100`,
            },
            {
                key: "m_2",
                unit: "m²",
                calc: `x`,
                init: `x`,
            },
            {
                key: "dm_2",
                unit: "dm²",
                calc: `x / 0.01`,
                init: `x * 0.01`,
            },
            {
                key: "cm_2",
                unit: "cm²",
                calc: `x / 0.0001`,
                init: `(x * 0.0001)`,
            },
            {
                key: "mm_2",
                unit: "mm²",
                calc: `x / 0.000001`,
                init: `x * 0.000001`,
            },
            {
                key: "acre",
                unit: "acre",
                calc: `x / ((0.3048^2) * (16.5^2) * 160)`,
                init: `x * ((0.3048^2) * (16.5^2) * 160)`,
            },
            {
                key: "mi_2",
                unit: "mi²",
                calc: `x / ((0.3048 * 3 * 1760)^2)`,
                init: `(x * ((0.3048 * 3 * 1760)^2))`,
            },
            {
                key: "yd_2",
                unit: "yd²",
                calc: `x / ((0.3048^2) * 9)`,
                init: `x * ((0.3048^2) * 9)`,
            },
            {
                key: "ft_2",
                unit: "ft²",
                calc: `x / (0.3048^2)`,
                init: `x * (0.3048^2)`,
            },
            {
                key: "in_2",
                unit: "in²",
                calc: `x / ((0.3048^2) / 144)`,
                init: `x * ((0.3048^2) / 144)`,
            },
            {
                key: "rd_2",
                unit: "rd²",
                calc: `x / ((0.3048^2) * (16.5^2))`,
                init: `x * ((0.3048^2) * (16.5^2))`,
            },
            {
                key: "cn_qing",
                unit: "qing",
                calc: `x / (100 / 0.0015)`,
                init: `x * (100 / 0.0015)`,
            },
            {
                key: "cn_mu",
                unit: "mu",
                calc: `x / (1 / 0.0015)`,
                init: `x * (1 / 0.0015)`,
            },
            {
                key: "cn_fen",
                unit: "fen",
                calc: `x / (1 / 0.015)`,
                init: `x * (1 / 0.015)`,
            },
            {
                key: "cn_chi_2",
                unit: "chi²",
                calc: `x / (1 / 9)`,
                init: `(x * (1 / 9))`,
            },
            {
                key: "cn_cun_2",
                unit: "cun²",
                calc: `x / (0.01 / 9)`,
                init: `x * (0.01 / 9)`,
            },
        ],
        special: [],
        group: [
            {
                key: "metric_system",
                list: ["km_2", "ha", "are", "m_2", "dm_2", "cm_2", "mm_2"],
            },
            {
                key: "imperial_units",
                list: ["acre", "mi_2", "yd_2", "ft_2", "in_2", "rd_2"],
            },
            {
                key: "chinese_units",
                list: ["cn_qing", "cn_mu", "cn_fen", "cn_chi_2", "cn_cun_2"],
            },
        ],
    },
    {
        key: "volume",
        main: "m_3",
        unit: [
            {
                key: "m_3",
                unit: "m³",
                calc: `x`,
                init: `x`,
            },
            {
                key: "dm_3",
                unit: "dm³",
                calc: `x / 0.001`,
                init: `(x * 0.001)`,
            },
            {
                key: "cm_3",
                unit: "cm³",
                calc: `x / 0.000001`,
                init: `(x * 0.000001)`,
            },
            {
                key: "mm_3",
                unit: "mm³",
                calc: `x / 0.000000001`,
                init: `(x * 0.000000001)`,
            },
            {
                key: "l",
                unit: "l",
                calc: `x / 0.001`,
                init: `(x * 0.001)`,
            },
            {
                key: "dl",
                unit: "dl",
                calc: `x / 0.0001`,
                init: `(x * 0.0001)`,
            },
            {
                key: "ml",
                unit: "ml",
                calc: `x / 0.000001`,
                init: `(x * 0.000001)`,
            },
            {
                key: "cl",
                unit: "cl",
                calc: `x / 0.00001`,
                init: `(x * 0.00001)`,
            },
            {
                key: "uL",
                unit: "μL",
                calc: `x / 0.000000001`,
                init: `(x * 0.000000001)`,
            },
            {
                key: "hl",
                unit: "hl",
                calc: `x / 0.1`,
                init: `(x * 0.1)`,
            },
            {
                key: "ft_3",
                unit: "ft_3",
                calc: `x / 0.0283168`,
                init: `(x * 0.0283168)`,
            },
            {
                key: "in_3",
                unit: "in_3",
                calc: `x / (0.0283168 / 1728)`,
                init: `(x * (0.0283168 / 1728))`,
            },
            {
                key: "yd_3",
                unit: "yd_3",
                calc: `x / (0.0283168 * 27)`,
                init: `(x * (0.0283168 * 27))`,
            },
            {
                key: "acre_ft",
                unit: "acre ft",
                calc: `x / (43560 * 1728 * 0.016387064 / 1000)`,
                init: `(x * (43560 * 1728 * 0.016387064 / 1000))`,
            },
            {
                key: "uk_gal",
                unit: "uk gal",
                calc: `x / 0.00454609188`,
                init: `(x * 0.00454609188)`,
            },
            {
                key: "us_gal",
                unit: "us gal",
                calc: `x / (231 * 0.016387064 / 1000)`,
                init: `(x * (231 * 0.016387064 / 1000))`,
            },
            {
                key: "uk_oz",
                unit: "uk oz",
                calc: `x / (0.000001 * 28.41)`,
                init: `(x * 0.000001 * 28.41)`,
            },
            {
                key: "us_oz",
                unit: "us oz",
                calc: `x / (0.000001 * 29.57)`,
                init: `(x * 0.000001 * 29.57)`,
            },
        ],
        special: [],
        group: [
            {
                key: "metric_system",
                list: ["m_3", "dm_3", "cm_3", "mm_3", "l", "dl", "ml", "cl", "uL", "hl"],
            },
            {
                key: "imperial_units",
                list: ["ft_3", "in_3", "yd_3", "acre_ft", "uk_gal", "us_gal", "uk_oz", "us_oz"],
            },
        ],
    },
    {
        key: "weight",
        main: "kg",
        unit: [
            {
                key: "kg",
                unit: "kg",
                calc: `x`,
                init: `x`,
            },
            {
                key: "g",
                unit: "g",
                calc: `x / 0.001`,
                init: `(x * 0.001)`,
            },
            {
                key: "mg",
                unit: "mg",
                calc: `x / 0.000001`,
                init: `(x * 0.000001)`,
            },
            {
                key: "ug",
                unit: "μg",
                calc: `x / 0.000000001`,
                init: `(x * 0.000000001)`,
            },
            {
                key: "t",
                unit: "t",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },
            {
                key: "q",
                unit: "q",
                calc: `x / 100`,
                init: `(x * 100)`,
            },
            {
                key: "ct",
                unit: "ct",
                calc: `x / 0.0002`,
                init: `(x * 0.0002)`,
            },

            {
                key: "lb",
                unit: "lb",
                calc: `x / 0.45359237`,
                init: `(x * 0.45359237)`,
            },
            {
                key: "oz",
                unit: "oz",
                calc: `x / (0.45359237 / 16)`,
                init: `(x * (0.45359237 / 16))`,
            },
            {
                key: "gr",
                unit: "gr",
                calc: `x / (0.45359237 / 7000)`,
                init: `(x * (0.45359237 / 7000))`,
            },
            {
                key: "lt",
                unit: "lt",
                calc: `x / (0.45359237 * 2240)`,
                init: `(x * (0.45359237 * 2240))`,
            },
            {
                key: "st1",
                unit: "st",
                calc: `x / (0.45359237 * 2000)`,
                init: `(x * (0.45359237 * 2000))`,
            },
            {
                key: "uk_cwt",
                unit: "uk cwt",
                calc: `x / (0.45359237 * 112)`,
                init: `(x * (0.45359237 * 112))`,
            },
            {
                key: "us_cwt",
                unit: "us cwt",
                calc: `x / (0.45359237 * 100)`,
                init: `(x * (0.45359237 * 100))`,
            },
            {
                key: "st2",
                unit: "st",
                calc: `x / (0.45359237 * 14)`,
                init: `(x * (0.45359237 * 14))`,
            },
            {
                key: "dr",
                unit: "dr",
                calc: `x / (0.45359237 / 256)`,
                init: `(x * (0.45359237 / 256))`,
            },
            {
                key: "cn_dan",
                unit: "dan",
                calc: `x / 50`,
                init: `(x * 50)`,
            },
            {
                key: "cn_jin",
                unit: "jin",
                calc: `x / 0.5`,
                init: `(x * 0.5)`,
            },
            {
                key: "cn_liang",
                unit: "liang",
                calc: `x / 0.05`,
                init: `(x * 0.05)`,
            },
            {
                key: "cn_qian",
                unit: "qian",
                calc: `x / 0.005`,
                init: `(x * 0.005)`,
            },
        ],
        special: [],
        group: [
            {
                key: "metric_system",
                list: ["kg", "g", "mg", "ug", "t", "q", "ct"],
            },
            {
                key: "imperial_units",
                list: ["lb", "oz", "gr", "lt", "st1", "uk_cwt", "us_cwt", "st2", "dr"],
            },
            {
                key: "chinese_units",
                list: ["cn_dan", "cn_jin", "cn_liang", "cn_qian"],
            },
        ],
    },
    {
        key: "temperature",
        main: "k",
        unit: [
            {
                key: "c",
                unit: "°C",
                calc: `(x - 273.15)`,
                init: `x + 273.15`,
            },
            {
                key: "f",
                unit: "°F",
                calc: `32 + ((x - 273.15) * 9 / 5)`,
                init: `(5 * (x - 32) / 9) + 273.15`,
            },
            {
                key: "k",
                unit: "K",
                calc: `(x - 273.15) + 273.15`,
                init: `(x - 273.15) + 273.15`,
            },
            {
                key: "r",
                unit: "°R",
                calc: `((x - 273.15) + 273.15) * 1.8`,
                init: `(x / 1.8 - 273.15) + 273.15`,
            },
            {
                key: "re",
                unit: "°Re",
                calc: `(x - 273.15) / 1.25`,
                init: `(x * 1.25) + 273.15`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["c", "f", "k", "r", "re"],
            },
        ],
    },
    {
        key: "pressure",
        main: "pa",
        unit: [
            {
                key: "pa",
                unit: "Pa",
                calc: `x`,
                init: `x`,
            },
            {
                key: "kpa",
                unit: "kpa",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },
            {
                key: "hpa",
                unit: "hpa",
                calc: `x / 100`,
                init: `(x * 100)`,
            },
            {
                key: "atm",
                unit: "atm",
                calc: `x / 101325`,
                init: `(x * 101325)`,
            },
            {
                key: "mmhg",
                unit: "mmHg",
                calc: `x / (101325 / 760)`,
                init: `(x * (101325 / 760))`,
            },
            {
                key: "in_hg",
                unit: "in Hg",
                calc: `x / (101325 / 760 * 25.4)`,
                init: `(x * (101325 / 760 * 25.4))`,
            },
            {
                key: "bar",
                unit: "bar",
                calc: `x / 100000`,
                init: `(x * 100000)`,
            },
            {
                key: "mbar",
                unit: "mbar",
                calc: `x / 100`,
                init: `(x * 100)`,
            },
            {
                key: "psf",
                unit: "psf",
                calc: `x / (6894.757 / 144)`,
                init: `(x * (6894.757 / 144))`,
            },
            {
                key: "psi",
                unit: "psi",
                calc: `x / 6894.757`,
                init: `(x * 6894.757)`,
            },
            {
                key: "mmwg",
                unit: "mmWG",
                calc: `x / (1 / 0.101972)`,
                init: `(x * (1 / 0.101972))`,
            },
            {
                key: "kgf_cm_2",
                unit: "kgf/cm²",
                calc: `x / 98066.5`,
                init: `(x * 98066.5)`,
            },
            {
                key: "kgf_m_2",
                unit: "kgf/m²",
                calc: `x / 9.80665`,
                init: `(x * 9.80665)`,
            },
            {
                key: "mpa",
                unit: "MPa",
                calc: `x / 1000000`,
                init: `(x * 1000000)`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["pa", "kpa", "hpa", "atm", "mmhg", "in_hg", "bar", "mbar", "psf", "psi", "mmwg", "kgf_cm_2", "kgf_m_2", "mpa"],
            },
        ],
    },
    {
        key: "power",
        main: "w",
        unit: [
            {
                key: "w",
                unit: "W",
                calc: `x`,
                init: `x`,
            },
            {
                key: "kw",
                unit: "kW",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },

            {
                key: "hp",
                unit: "hp",
                calc: `x / 745.699872`,
                init: `(x * 745.699872)`,
            },
            {
                key: "ps",
                unit: "ps",
                calc: `x / (9.80665 * 75)`,
                init: `(x * (9.80665 * 75))`,
            },
            {
                key: "kg_m_s",
                unit: "kg·m/s",
                calc: `x / 9.80665`,
                init: `(x * 9.80665)`,
            },
            {
                key: "kcal_s",
                unit: "kcal/s",
                calc: `x / 4184.1004`,
                init: `(x * 4184.1004)`,
            },
            {
                key: "btu_s",
                unit: "Btu/s",
                calc: `x / 1055.05585`,
                init: `(x * 1055.05585)`,
            },
            {
                key: "ft_lb_s",
                unit: "ft·lb/s",
                calc: `x / (745.699872 / 550)`,
                init: `(x * (745.699872 / 550))`,
            },
            {
                key: "j_s",
                unit: "J/s",
                calc: `x`,
                init: `x`,
            },
            {
                key: "n_m_s",
                unit: "N·m/s",
                calc: `x`,
                init: `x`,
            },
            {
                key: "dbm",
                unit: "dBm",
                calc: `10 * log(x,10) + 30`,
                init: `10^((x - 30)/10)`,
            },
            {
                key: "dbw",
                unit: "dBW",
                calc: `10 * log(x,10)`,
                init: `10^(x/10)`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["w", "kw", "hp", "ps", "kg_m_s", "kcal_s", "btu_s", "ft_lb_s", "j_s", "n_m_s", "dbm", "dbw"],
            },
        ],
    },
    {
        key: "work",
        main: "j",
        unit: [
            {
                key: "j",
                unit: "J",
                calc: `x`,
                init: `x`,
            },
            {
                key: "kg_m",
                unit: "kg·m",
                calc: `x / 9.80392157`,
                init: `(x * 9.80392157)`,
            },
            {
                key: "ps_h",
                unit: "ps·h",
                calc: `x / (9.80665 * 75 * 3600)`,
                init: `(x * (9.80665 * 75 * 3600))`,
            },
            {
                key: "hp_h",
                unit: "hp·h",
                calc: `x / (745.699872 * 3600)`,
                init: `(x * (745.699872 * 3600))`,
            },
            {
                key: "kw_h",
                unit: "kW·h",
                calc: `x / 3600000`,
                init: `(x * 3600000)`,
            },
            {
                key: "kw_h_",
                unit: "kW·h",
                calc: `x / 3600000`,
                init: `(x * 3600000)`,
            },
            {
                key: "cal",
                unit: "cal",
                calc: `x / 4.185851820846`,
                init: `(x * 4.185851820846)`,
            },
            {
                key: "kcal",
                unit: "kcal",
                calc: `x / 4185.851820846`,
                init: `(x * 4185.851820846)`,
            },
            {
                key: "btu",
                unit: "btu",
                calc: `x / 1055.05585262`,
                init: `(x * 1055.05585262)`,
            },
            {
                key: "ft_lb",
                unit: "ft·lb",
                calc: `x / 1.3557483731`,
                init: `(x * 1.3557483731)`,
            },
            {
                key: "kj",
                unit: "kJ",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["j", "kg_m", "ps_h", "hp_h", "kw_h", "kw_h_", "cal", "kcal", "btu", "ft_lb", "kj"],
            },
        ],
    },
    {
        key: "density",
        main: "kg_m_3",
        unit: [
            {
                key: "kg_cm_3",
                unit: "kg/cm³",
                calc: `x / (10^6)`,
                init: `(x * 1000000)`,
            },
            {
                key: "kg_dm_3",
                unit: "kg/dm³",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },
            {
                key: "kg_m_3",
                unit: "kg/m³",
                calc: `x`,
                init: `x`,
            },
            {
                key: "g_cm_3",
                unit: "g/cm³",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },
            {
                key: "g_dm_3",
                unit: "g/dm³",
                calc: `x`,
                init: `x`,
            },
            {
                key: "g_m_3",
                unit: "g/m³",
                calc: `(x * 1000)`,
                init: `x / 1000`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["kg_cm_3", "kg_dm_3", "kg_m_3", "g_cm_3", "g_dm_3", "g_m_3"],
            },
        ],
    },
    {
        key: "strength",
        main: "n",
        unit: [
            {
                key: "n",
                unit: "N",
                calc: `x`,
                init: `x`,
            },
            {
                key: "kn",
                unit: "kN",
                calc: `x / 1000`,
                init: `(x * 1000)`,
            },
            {
                key: "kgf",
                unit: "kgf",
                calc: `(x * 101.971621) / 1000`,
                init: `(x * 9.806650)`,
            },
            {
                key: "gf",
                unit: "gf",
                calc: `(x * 101.971621)`,
                init: `(x * 9.806650) / 1000`,
            },
            {
                key: "tf",
                unit: "tf",
                calc: `(x * 101.971621) / (10^6)`,
                init: `(x * 9806.650000)`,
            },
            {
                key: "lbf",
                unit: "lbf",
                calc: `(x * 224.808943) / 1000`,
                init: `(x * 4.448222)`,
            },
            {
                key: "kip",
                unit: "kip",
                calc: `(x * 224.808943) / (10^6)`,
                init: `(x * 4448.221615)`,
            },
            {
                key: "dyn",
                unit: "dyn",
                calc: `(x * 100000)`,
                init: `x / 100000`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["n", "kn", "kgf", "gf", "tf", "lbf", "kip", "dyn"],
            },
        ],
    },
    {
        key: "time",
        main: "s",
        unit: [
            {
                key: "yr",
                unit: "yr",
                calc: `x / 31536000`,
                init: `x * 31536000`,
            },
            {
                key: "week",
                unit: "week",
                calc: `x / 604800`,
                init: `x * 604800`,
            },
            {
                key: "d",
                unit: "d",
                calc: `x / 86400`,
                init: `x * 86400`,
            },
            {
                key: "h",
                unit: "h",
                calc: `x / 3600`,
                init: `x * 3600`,
            },
            {
                key: "min",
                unit: "min",
                calc: `x / 60`,
                init: `x * 60`,
            },
            {
                key: "s",
                unit: "s",
                calc: `x`,
                init: `x`,
            },
            {
                key: "ms",
                unit: "ms",
                calc: `x * 1000`,
                init: `x / 1000`,
            },
            {
                key: "us",
                unit: "μs",
                calc: `x * 1000000`,
                init: `x / 1000000`,
            },
            {
                key: "ns",
                unit: "ns",
                calc: `x * 1000000000`,
                init: `x / 1000000000`,
            },
        ],
        special: [
            {
                from: "h",
                to: "min",
                func: `x * 60`,
            },
        ],
        group: [
            {
                key: "",
                list: ["yr", "week", "d", "h", "min", "s", "ms", "us", "ns"],
            },
        ],
    },
    {
        key: "speed",
        main: "m_s",
        unit: [
            {
                key: "m_s",
                unit: "m/s",
                calc: `x`,
                init: `x`,
            },
            {
                key: "km_s",
                unit: "km/s",
                calc: `x / 1000`,
                init: `x * 1000`,
            },
            {
                key: "km_h",
                unit: "km/h",
                calc: `x * 3.6`,
                init: `x / 3.6`,
            },
            {
                key: "c",
                unit: "c",
                calc: `x / 299792458`,
                init: `x * 299792458`,
            },
            {
                key: "mach",
                unit: "mach",
                calc: `x / 340.3`,
                init: `x * 340.3`,
            },
            {
                key: "mile_h",
                unit: "mile/h",
                calc: `x * 2.236936`,
                init: `x / 2.236936`,
            },
            {
                key: "in_s",
                unit: "in/s",
                calc: `x * 39.370079`,
                init: `x / 39.370079`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["m_s", "km_s", "km_h", "c", "mach", "mile_h", "in_s"],
            },
        ],
    },
    {
        key: "byte",
        main: "b",
        unit: [
            {
                key: "bit",
                unit: "bit",
                calc: `x * 8`,
                init: `x / 8`,
            },
            {
                key: "b",
                unit: "b",
                calc: `x`,
                init: `x`,
            },
            {
                key: "kb",
                unit: "kb",
                calc: `x / (2^10)`,
                init: `(x * (2^10))`,
            },
            {
                key: "mb",
                unit: "mb",
                calc: `x / (2^20)`,
                init: `(x * (2^20))`,
            },
            {
                key: "gb",
                unit: "gb",
                calc: `x / (2^30)`,
                init: `(x * (2^30))`,
            },
            {
                key: "tb",
                unit: "tb",
                calc: `x / (2^40)`,
                init: `(x * (2^40))`,
            },
            {
                key: "pb",
                unit: "pb",
                calc: `x / (2^50)`,
                init: `(x * (2^50))`,
            },
            {
                key: "eb",
                unit: "eb",
                calc: `x / (2^60)`,
                init: `(x * (2^60))`,
            },
        ],
        special: [],
        group: [
            {
                key: "",
                list: ["bit", "b", "kb", "mb", "gb", "tb", "pb", "eb"],
            },
        ],
    },
    {
        key: "angle",
        main: "degree",
        unit: [
            {
                key: "circle",
                unit: "circle",
                calc: `x / 360`,
                init: `x * 360`,
            },
            {
                key: "angle",
                unit: "angle",
                calc: `x / 90`,
                init: `x * 90`,
            },
            {
                key: "gon",
                unit: "gon",
                calc: `x * (400 / 360)`,
                init: `x / (400 / 360)`,
            },
            {
                key: "degree",
                unit: "°",
                calc: `x`,
                init: `x`,
            },
            {
                key: "min",
                unit: " ′",
                calc: `x * 60`,
                init: `x / 60`,
            },
            {
                key: "s",
                unit: "'",
                calc: `(x * 3600)`,
                init: `x / 3600`,
            },
            {
                key: "rad",
                unit: "rad",
                calc: `x / 57.29578`,
                init: `x * 57.29578`,
            },
            {
                key: "mrad",
                unit: "mrad",
                calc: `x * 17.453293`,
                init: `x / 17.453293`,
            },
        ],
        special: [],
        group: [
            {
                key: "angle_units",
                list: ["circle", "angle", "gon", "degree", "min", "s"],
            },
            {
                key: "radian_units",
                list: ["rad", "mrad"],
            },
        ],
    },
];

export const getGroupByUnit = (type: string, unit: string) => {
    for (let group of getType(type).group) {
        if (group.list.includes(unit)) {
            return group.key;
        }
    }
    return "";
};

export const calculate = function(type: string, num: string, from: string, to: string) {
    let fromUnit = getUnit(type, from);
    if (from === to) {
        return format(num);
    }
    let toUnit = getUnit(type, to);

    let special = getSpecial(type, from, to);

    const calc = (input: string, expression: string) => {
        return math.evaluate(expression.replaceAll("x", input)).toString();
    };
    if (special !== null) {
        num = calc(num, special);
    } else {
        num = calc(calc(num, fromUnit.init), toUnit.calc);
    }
    return format(num);
};

export const getType = (name: string): ConfigType => {
    for (let type of config) {
        if (name === type.key) {
            return type;
        }
    }
    throw new Error(`${name} type not found`);
};

export const getUnit = (type: string, unitKey: string) => {
    for (let unit of getType(type).unit) {
        if (unitKey === unit.key) {
            return unit;
        }
    }
    throw new Error(`${type} - ${unitKey} unit not found`);
};

const getSpecial = (name: string, from: string, to: string) => {
    let type = getType(name);
    if (type.special.length > 0) {
        for (let special of type.special) {
            if (special["from"] === from && special["to"] === to) {
                return special["func"];
            }
        }
    }
    return null;
};

/*
 * 对结果进行格式化(内部使用)
 */
const format = function(_num: string) {
    let num = Number(_num);

    //格式策略，整体不超过14位
    let strNum = `${num}`,
        isFloat = false,
        arr, intPart, decPart;
    //只有包括.且整数位小于14位才认为是浮点数（便于以后格式化）
    if (strNum.indexOf(".") > -1) {
        let match = strNum.match(/\.\d+e[+-](\d+)$/);
        if (match && match[1]) {
            isFloat = (match[1] as any) * 1 < (MAX_NUM - 1);
        } else {
            isFloat = true;
        }
    }
    //小数处理逻辑
    if (isFloat) {
        //-1 ~ 1之间的小数
        if (num > -1 && num < 1 && num != 0) {
            //小数位开始有5个及以上0，转换为科学计数法，计数小数保留四位
            if (Math.abs(num) < 0.00001) {
                return exponential(num, EXPONENTIAL_NUM);
            } else {
                //保留7位小数
                num = Number(num.toFixed(DECIMAL_NUM));
            }
        } else {
            arr = strNum.split(".");
            intPart = arr[0];
            decPart = arr[1];
            //整体超长
            if (strNum.length > MAX_NUM) {
                //整数部分超长
                if (intPart.length >= MAX_NUM) {
                    return exponential(num, EXPONENTIAL_NUM);
                } else {
                    if (intPart.length < DECIMAL_NUM - 1) {
                        num = Number(num.toFixed(DECIMAL_NUM));
                    } else {
                        num = Number(num.toFixed(MAX_NUM - intPart.length - 1));
                    }
                }
            } else {
                if (decPart.length > DECIMAL_NUM) {
                    num = Number(num.toFixed(DECIMAL_NUM));
                }
            }
        }
    } else {
        if (strNum.length > MAX_NUM) {
            return exponential(num, EXPONENTIAL_NUM);
        }
    }
    return `${num}`;
};

// 科学计数法快捷函数
const exponential = (num: number, n: number) => {
    //保留科学计数法小数后n位
    let numExp = num.toExponential(n);
    //如果计数小数位均为0，去掉
    return (numExp + "").match(new RegExp(".0{" + n + "}e")) ? num.toExponential(0) : numExp;
};
