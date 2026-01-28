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
            { id: 'politics', label: '政治学', description: '民主政治、憲法、国際政治' },
            { id: 'economics', label: '経済学', description: '市場、財政、金融、労働' },
            { id: 'ethics', label: '倫理', description: '源流思想、西洋・日本・現代思想' },
            { id: 'current_affairs', label: '現代社会・時事', description: '環境、人口、国際社会の課題' }
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
