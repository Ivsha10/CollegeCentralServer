const College = require('../model/College');
const blue = "\x1b[34m";
const estimateScores = async () => {

    const colleges = await College.find().exec();


    //updating tuition scores
    let tuitionFees = [];

    for (let college of colleges) {
        tuitionFees.push(college.tuitionFee);
    }

    let maxFee = Math.max(...tuitionFees);
    let minFee = Math.min(...tuitionFees);
    let tuitionRange = maxFee - minFee;

    for (let college of colleges) {
        score = 10 - ((college.tuitionFee - minFee) / tuitionRange) * 9;
        college.tuitionScore = parseFloat(score.toFixed(2));
        let res = await college.save();
    }

    console.log(blue, 'UPDATED TUITION SCORES');
    //ended updating tuition scores


    //updating academic ranking scores
    let academicRankings = [];

    for (let college of colleges) {
        academicRankings.push(college.academicRanking);
    }


    let worst = Math.max(...academicRankings);
    let best = Math.min(...academicRankings);
    let academicRange = worst - best;

    for (let college of colleges) {
        score = 10 - ((college.academicRanking - best) / academicRange) * 9;
        college.academicScore = parseFloat(score.toFixed(2));
        let res = await college.save();
    }

    console.log(blue, 'UPDATED ACADEMIC RANKING SCORES');
    //ended updating academic ranking scores



}

module.exports = { estimateScores };