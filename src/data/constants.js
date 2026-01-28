export const COURSE_STRUCTURE = {
    pedagogy_general: {
        label: '教職・一般',
        units: [
            { id: 'edu_law', label: '教育法規', description: '教育基本法、学校教育法など' },
            { id: 'edu_principles', label: '教育原理', description: '学習指導要領、中教審答申など' },
            { id: 'edu_psychology', label: '教育心理', description: '発達理論、学習理論、評価など' },
            { id: 'edu_history', label: '教育史', description: '西洋教育史、日本教育史' }
        ]
    },
    civics: {
        label: '専門：公民',
        units: [
            { id: 'ethics', label: '倫理学', description: '源流思想、日本・西洋思想、現代のエトス' },
            { id: 'politics', label: '政治学', description: '民主政治原理、日本国憲法、国際関係' },
            { id: 'economics', label: '経済学', description: '経済理論、日本経済統計、現代の経済課題' },
            { id: 'public_society', label: '公共・現代社会', description: '現代の社会的諸課題、人間、生命・情報倫理' },
            { id: 'cross_disciplinary', label: '分野横断（地公混合）', description: '九州各県の傾向：地理・歴史・公民の融合問題' }
        ]
    },
    special_needs_fukuoka: {
        label: '福岡市：特支',
        units: [
            { id: 'independent_activities', label: '自立活動', description: '6区分27項目、個別の指導計画' },
            { id: 'disabilities', label: '障害種別理解', description: '発達障害、知的障害の特性' },
            { id: 'fukuoka_policy', label: '福岡市の施策', description: '福岡市特別支援教育推進プラン' },
            { id: 'reasonable_accommodation', label: '合理的配慮', description: '差別解消法、現場での配慮' }
        ]
    }
};
