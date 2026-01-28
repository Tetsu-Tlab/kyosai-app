export const CATEGORIES = {
    pedagogy_general: "教職・一般",
    civics: "専門：公民",
    geography: "専門：地理",
    special_needs_fukuoka: "福岡市：特支",
    prediction_2026: "2026年度 予想問題"
};

export const QUESTIONS = [
    // --- 教職・一般 (Pedagogy & General) ---
    {
        id: "pg_1",
        category: "pedagogy_general",
        unit: "edu_principles",
        question: "「学習指導要領」における「生きる力」の3つの要素として、正しい組み合わせはどれか。",
        options: [
            "確かな学力、豊かな人間性、健やかな体",
            "基礎的知識、判断力、道徳心",
            "主体性、対話、深い学び",
            "知識・技能、思考力・判断力・表現力、人間関係調整力"
        ],
        correctIndex: 0,
        explanation: "「生きる力」は、知・徳・体のバランスのとれた力として定義され、「確かな学力」「豊かな人間性」「健やかな体」の3つを柱とします。",
        reference: "学習指導要領解説 総則編"
    },
    {
        id: "pg_2",
        category: "pedagogy_general",
        unit: "edu_law",
        question: "日本国憲法第26条において定められている「教育を受ける権利」と対になる義務は何か。",
        options: [
            "教育を受けさせる義務",
            "勤労の義務",
            "納税の義務",
            "学校へ行く義務"
        ],
        correctIndex: 0,
        explanation: "保護者は、その保護する子女に普通教育を受けさせる義務を負います（憲法26条2項）。",
        reference: "日本国憲法 第26条"
    },
    {
        id: "pg_3",
        category: "pedagogy_general",
        unit: "edu_law",
        question: "教育基本法第1条（教育の目的）に記述されている「完成」を目指すものとして正しいものは何か。",
        options: [
            "人格の完成",
            "国民の完成",
            "学力の完成",
            "個性の完成"
        ],
        correctIndex: 0,
        explanation: "教育は、人格の完成を目指し、平和で民主的な国家及び社会の形成者として必要な資質を備えた心身ともに健康な国民の育成を期して行われなければなりません。",
        reference: "教育基本法 第1条"
    },
    {
        id: "pg_4",
        category: "pedagogy_general",
        unit: "edu_law",
        question: "「いじめ防止対策推進法」において、いじめの定義として正しい記述はどれか。",
        options: [
            "心理的又は物理的な影響を与える行為であって、いじめを受けた児童等が心身の苦痛を感じているもの",
            "学校内で行われる暴力行為に限られる",
            "継続的に行われる嫌がらせ行為のみを指す",
            "インターネット上の行為は含まれない"
        ],
        correctIndex: 0,
        explanation: "場所や時間、方法（ネット含む）を問わず、対象となった児童等が「心身の苦痛を感じているもの」がいじめと定義されます。",
        reference: "いじめ防止対策推進法 第2条"
    },
    {
        id: "pg_5",
        category: "pedagogy_general",
        unit: "edu_principles",
        question: "GIGAスクール構想において、児童生徒「1人1台端末」とともに整備が進められているものは何か。",
        options: [
            "高速大容量の通信ネットワーク",
            "電子黒板の全教室設置",
            "デジタル教科書の無償配布",
            "プログラミング教育の必修化"
        ],
        correctIndex: 0,
        explanation: "GIGAスクール構想は、1人1台端末と、高速大容量の通信ネットワークを一体的に整備することを中核としています。",
        reference: "文部科学省 GIGAスクール構想"
    },

    // --- 専門：公民 (Civics) ---
    {
        id: "cv_1",
        category: "civics",
        unit: "politics",
        question: "ジョン・ロックが『統治二論』で主張し、日本国憲法にも影響を与えた概念はどれか。",
        options: [
            "抵抗権（革命権）",
            "王権神授説",
            "万人の万人に対する闘争",
            "最大多数の最大幸福"
        ],
        correctIndex: 0,
        explanation: "ロックは、政府が社会契約に反して人民の権利を侵害した場合、人民には政府を変更する抵抗権（革命権）があると説きました。",
        reference: "ロック『統治二論』"
    },
    {
        id: "cv_2",
        category: "civics",
        unit: "economics",
        question: "アダム・スミスが説いた、個人の利己的な経済活動が結果として社会全体の利益をもたらす働きを何と呼ぶか。",
        options: [
            "神の見えざる手",
            "比較優位",
            "有効需要の原理",
            "創造的破壊"
        ],
        correctIndex: 0,
        explanation: "市場メカニズムの調整機能を「神の見えざる手」と表現しました。",
        reference: "アダム・スミス『国富論』"
    },
    {
        id: "cv_3",
        category: "civics",
        unit: "politics",
        question: "日本の裁判員制度において、裁判員が参加する裁判はどれか。",
        options: [
            "地方裁判所で行われる重大な刑事事件の第一審",
            "家庭裁判所で行われる少年事件の審判",
            "簡易裁判所で行われる民事訴訟",
            "高等裁判所で行われる控訴審"
        ],
        correctIndex: 0,
        explanation: "裁判員制度の対象は、殺人や強盗致死傷など、重大な刑事事件の第一審（地方裁判所）です。",
        reference: "裁判員の参加する刑事裁判に関する法律"
    },
    {
        id: "cv_4",
        category: "civics",
        unit: "cross_disciplinary",
        question: "福岡県を含む九州地方での農業に関連し、食料自給率の向上策として推進されている「地産地消」のメリットとして適切でないものはどれか。",
        options: [
            "輸送コストの増大による環境負荷の増加",
            "地域の農林水産業の活性化",
            "消費者と生産者の顔が見える関係の構築",
            "旬の食材による食育の推進"
        ],
        correctIndex: 0,
        explanation: "地産地消は輸送距離（フードマイレージ）を短縮し、環境負荷を低減させるため、輸送コストの増大は誤りです。",
        reference: "食料・農業・農村基本計画"
    },
    {
        id: "cv_5",
        category: "civics",
        unit: "public_society",
        question: "現代の国際社会における「人間の安全保障」の考え方を提唱した機関はどれか。",
        options: [
            "国連開発計画 (UNDP)",
            "世界貿易機関 (WTO)",
            "国際通貨基金 (IMF)",
            "北大西洋条約機構 (NATO)"
        ],
        correctIndex: 0,
        explanation: "1994年の『人間開発報告書』でUNDPが提唱しました。国家の安全だけでなく、個人の生命や生活を守ることを重視します。",
        reference: "UNDP 人間開発報告書"
    },

    // --- 専門：地理 (Geography) ---
    {
        id: "ss_1",
        category: "geography",
        unit: "physical_geo",
        question: "日本の地形図において、等高線の間隔が狭い場所はどのような地形を示しているか。",
        options: [
            "傾斜が急である",
            "傾斜が緩やかである",
            "平坦地である",
            "盆地である"
        ],
        correctIndex: 0,
        explanation: "等高線の間隔が狭いほど、標高差が短い水平距離で変化していることを示し、急傾斜となります。",
        reference: "地理総合 地図の読み方"
    },
    {
        id: "ss_2",
        category: "geography",
        unit: "regional_japan",
        question: "鎌倉幕府において、御家人が将軍に対して軍役などを負担することを何というか。",
        options: [
            "奉公",
            "御恩",
            "公地公民",
            "楽市楽座"
        ],
        correctIndex: 0,
        explanation: "将軍から土地の支配を認められる「御恩」に対し、御家人が軍役や番役を果たすことを「奉公」といいます。",
        reference: "歴史総合 中世の社会"
    },
    {
        id: "ss_3",
        category: "geography",
        unit: "regional_world",
        question: "第二次世界大戦後、1951年に日本が主権を回復した条約はどれか。",
        options: [
            "サンフランシスコ平和条約",
            "日米安全保障条約",
            "ポツダム宣言",
            "日ソ共同宣言"
        ],
        correctIndex: 0,
        explanation: "1951年9月に調印され、翌52年に発効したことで日本は主権を回復しました。",
        reference: "日本史B 戦後史"
    },
    {
        id: "ss_4",
        category: "geography",
        unit: "physical_geo",
        question: "ケッペンの気候区分において、日本（本州）の大部分が属する気候はどれか。",
        options: [
            "温暖湿潤気候 (Cfa)",
            "西岸海洋性気候 (Cfb)",
            "地中海性気候 (Cs)",
            "亜寒帯湿潤気候 (Df)"
        ],
        correctIndex: 0,
        explanation: "日本（北海道を除く）は、四季の変化が明瞭で降水量が多い温暖湿潤気候に属します。",
        reference: "地理探究 気候区分"
    },
    {
        id: "ss_5",
        category: "geography",
        unit: "human_geo",
        question: "円高（円の価値上昇）が進んだ場合、一般的にどのような影響が生じるか。",
        options: [
            "輸入品の価格が下がり、海外旅行に行きやすくなる",
            "輸出企業の利益が増大する",
            "外国人観光客が増加する",
            "国内のインフレが加速する"
        ],
        correctIndex: 0,
        explanation: "円高になると、海外の商品を安く買えるようになる一方、輸出企業の価格競争力は低下します。",
        reference: "政治・経済 国際経済"
    },

    // --- 福岡市：特支 (Special Needs Fukuoka Focus) ---
    {
        id: "sn_1",
        category: "special_needs_fukuoka",
        unit: "independent_activities",
        question: "特別支援学校小学部学習指導要領において、「自立活動」の6区分に含まれないものはどれか。",
        options: [
            "職業・家庭",
            "健康の保持",
            "心理的な安定",
            "環境の把握"
        ],
        correctIndex: 0,
        explanation: "自立活動の6区分は「健康の保持」「心理的な安定」「人間関係の形成」「環境の把握」「身体の動き」「コミュニケーション」です。「職業・家庭」は含まれません。",
        reference: "特別支援学校学習指導要領解説 自立活動編"
    },
    {
        id: "sn_2",
        category: "special_needs_fukuoka",
        unit: "independent_activities",
        question: "福岡市が推進する「個別の教育支援計画」の説明として、最も適切なものはどれか。",
        options: [
            "乳幼児期から学校卒業後までを見通した長期的な視点での支援計画",
            "教科の指導目標のみを詳細に記したもの",
            "学期ごとに作成し直す短期的な指導案",
            "医療機関のみが作成するもの"
        ],
        correctIndex: 0,
        explanation: "個別の教育支援計画は、関係機関が連携し、乳幼児期から就労等までの一貫した支援を行うためのツールです。",
        reference: "福岡市特別支援教育推進プラン"
    },
    {
        id: "sn_3",
        category: "special_needs_fukuoka",
        unit: "disabilities",
        question: "特別支援学級に在籍する児童に対して作成される「個別の指導計画」の主な目的は何か。",
        options: [
            "一人一人の教育的ニーズに応じたきめ細かな指導の実施",
            "通常学級への転籍を早めること",
            "保護者への説明責任を免除すること",
            "学年の統一目標を達成させること"
        ],
        correctIndex: 0,
        explanation: "個別の指導計画は、児童生徒の実態を把握し、具体的な指導目標や内容、手立てを明確にするために作成されます。",
        reference: "学習指導要領 総則"
    },
    {
        id: "sn_4",
        category: "special_needs_fukuoka",
        unit: "disabilities",
        question: "発達障害者支援法において定義される「LD」の正式名称は何か。",
        options: [
            "学習障害 (Learning Disabilities)",
            "注意欠陥・多動性障害",
            "自閉症スペクトラム障害",
            "知的障害"
        ],
        correctIndex: 0,
        explanation: "LDはLearning Disabilitiesの略で、基本的には全般的な知的発達に遅れはないが、聞く、話す、読む、書く、計算する等の特定の能力に困難が生じるものです。",
        reference: "発達障害者支援法"
    },
    {
        id: "sn_5",
        category: "special_needs_fukuoka",
        unit: "reasonable_accommodation",
        question: "福岡市における「合理的配慮」の提供の基礎となる法律はどれか。",
        options: [
            "障害者差別解消法",
            "児童福祉法",
            "生活保護法",
            "学校保健安全法"
        ],
        correctIndex: 0,
        explanation: "障害者差別解消法（障害を理由とする差別の解消の推進に関する法律）に基づき、公立学校を含む行政機関等には合理的配慮の提供が義務付けられています。",
        reference: "障害者差別解消法"
    },

    // --- 2026年度 予想問題 (2026 Predictions) ---
    {
        id: "pred_1",
        category: "prediction_2026",
        unit: "pred_pedagogy",
        question: "2024年（令和6年）に全面施行・改訂が進む「生徒指導提要」に関し、近年の不登校対策の核となる考え方はどれか。",
        options: [
            "登校という結果のみを目標とせず、社会的自立を目指した支援を行う",
            "一律の家庭訪問による登校刺激を最優先する",
            "適応指導教室への通所を強制する",
            "出席日数が足りない場合は一律に留年とする"
        ],
        correctIndex: 0,
        explanation: "最新の生徒指導提要や文科省通知では、登校という結果のみを目標とせず、児童生徒の状況に応じた多様な学びの場（フリースクール等）の活用や、社会的自立へ向けた支援が重視されています。",
        reference: "生徒指導提要（令和4年改訂版以降の指針）"
    },
    {
        id: "pred_2",
        category: "prediction_2026",
        unit: "pred_civics",
        question: "新科目「公共」において重視される、対立する利益を調整し、合意形成を図るための2つの調整原理はどれか。",
        options: [
            "効率と公正",
            "自由と平等",
            "需要と供給",
            "権利と義務"
        ],
        correctIndex: 0,
        explanation: "「公共」では、社会的事象を考察する際の視点として「効率」と「公正」が極めて重要視されています。",
        reference: "高等学校学習指導要領 公共"
    }
];
