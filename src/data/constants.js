export const COURSE_STRUCTURE = {
    pedagogy: {
        label: '教職教養',
        description: '教育原理、法規、心理、最新の2026予想まで',
        color: 'bg-indigo-500',
        units: [
            { id: 'edu_principles', label: '教育原理', description: '学習指導要領、中教審答申など' },
            { id: 'edu_law', label: '教育法規', description: '教育基本法、学校教育法など' },
            { id: 'edu_psychology', label: '教育心理', description: '発達理論、学習理論、評価など' },
            { id: 'edu_history', label: '教育史', description: '西洋教育史、日本教育史' },
            { id: 'pred_pedagogy', label: '2026年度予想', description: '最新の法改正・答申を踏まえた最重要予測' }
        ]
    },
    social_studies: {
        label: '専門教養（社会）',
        description: '公民（政治・経済・倫理）と地理の統合演習',
        color: 'bg-rose-500',
        units: [
            { id: 'politics', label: '政治学', description: '民主政治原理、日本国憲法、国際関係' },
            { id: 'economics', label: '経済学', description: '経済理論、日本経済統計' },
            { id: 'ethics', label: '倫理学', description: '源流思想、日本・西洋思想' },
            { id: 'physical_geo', label: '系統地理', description: '自然環境、資源、産業、人口' },
            { id: 'regional_geo', label: '地誌（日本・世界）', description: '諸地域の事象、地域調査' },
            { id: 'cross_disciplinary', label: '分野横断（地公混合）', description: '九州各県の傾向：融合問題' }
        ]
    },
    special_needs: {
        label: '特別支援教育',
        description: '自立活動から福岡市独自の施策まで',
        color: 'bg-amber-500',
        units: [
            { id: 'independent_activities', label: '自立活動', description: '6区分27項目、個別の指導計画' },
            { id: 'disabilities', label: '障害種別理解', description: '発達障害、知的障害の特性' },
            { id: 'fukuoka_policy', label: '福岡市の施策', description: '福岡市特別支援教育推進プラン' },
            { id: 'reasonable_accommodation', label: '合理的配慮', description: '差別解消法、現場での配慮' }
        ]
    }
};
