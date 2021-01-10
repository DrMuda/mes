const {planList, planDetails} = require('./data')

module.exports = {
    'GET /api/production/orderplan/planlist': (req, res) => {
        res.send({
            data: planList,
            success: true
        })
    },

    'GET /api/production/orderplan/checkPlan': (req, res) => {
        let { planKey } = req.query;

        if (!planKey) return res.send({ data: {}, success: false });

        let checkPlanChartData = planList.find(item => item.planKey === planKey);

        return res.send({
            checkPlanChartData,
            checkPlanDetails: planDetails,
            success: true
        })
    }
}

