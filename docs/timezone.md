# Module: timezone

**File:** `\packages\ctool-core\src\tools\time\util\timezone.ts`

## Overview

Module `timezone` contains 0 analyzed entities.

```
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// @link https://github.com/discourse/moment-timezone-names-translations/blob/main/locales/zh-cn.js
const timezoneMap = [
    { name: "Africa/Abidjan", zh_CN: "阿比让" },
    { name: "Africa/Accra", zh_CN: "阿克拉" },
    { name: "Africa/Addis_Ababa", zh_CN: "亚的斯亚贝巴" },
    { name: "Africa/Algiers", zh_CN: "阿尔及尔" },
    { name: "Africa/Asmera", zh_CN: "阿斯马拉" },
    { name: "Africa/Bamako", zh_CN: "巴马科" },
    { name: "Africa/Bangui", zh_CN: "班吉" },
    { name: "Africa/Banjul", zh_CN: "班珠尔" },
    { name: "Africa/Bissau", zh_CN: "比绍" },
    { name: "Africa/Blantyre", zh_CN: "布兰太尔" },
    { name: "Africa/Brazzaville", zh_CN: "布拉柴维尔" },
    { name: "Africa/Bujumbura", zh_CN: "布琼布拉" },
    { name: "Africa/Cairo", zh_CN: "开罗" },
    { name: "Africa/Casablanca", zh_CN: "卡萨布兰卡" },
    { name: "Africa/Ceuta", zh_CN: "休达" },
    { name: "Africa/Conakry", zh_CN: "科纳克里" },
    { name: "Africa/Dakar", zh_CN: "达喀尔" },
    { name: "Africa/Dar_es_Salaam", zh_CN: "达累斯萨拉姆" },
    { name: "Africa/Djibouti", zh_CN: "吉布提" },
    { name: "Africa/Douala", zh_CN: "杜阿拉" },
    { name: "Africa/El_Aaiun", zh_CN: "阿尤恩" },
    { name: "Africa/Freetown", zh_CN: "弗里敦" },
    { name: "Africa/Gaborone", zh_CN: "哈博罗内" },
    { name: "Africa/Harare", zh_CN: "哈拉雷" },
    { name: "Africa/Johannesburg", zh_CN: "约翰内斯堡" },
    { name: "Africa/Juba", zh_CN: "朱巴" },
    { name: "Africa/Kampala", zh_CN: "坎帕拉" },
    { name: "Africa/Khartoum", zh_CN: "喀土穆" },
    { name: "Africa/Kigali", zh_CN: "基加利" },
    { name: "Africa/Kinshasa", zh_CN: "金沙萨" },
    { name: "Africa/Lagos", zh_CN: "拉各斯" },
    { name: "Africa/Libreville", zh_CN: "利伯维尔" },
    { name: "Africa/Lome", zh_CN: "洛美" },
    { name: "Africa/Luanda", zh_CN: "罗安达" },
    { name: "Africa/Lubumbashi", zh_CN: "卢本巴希" },
    { name: "Africa/Lusaka", zh_CN: "卢萨卡" },
    { name: "Africa/Malabo", zh_CN: "马拉博" }
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
