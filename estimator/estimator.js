const College = require('../model/College');

const estimateScores = async () => {

    const colleges = await College.find().exec();

    const getAcademicScores = async () => {
        let academicRankings = [];

        for(let college of colleges) {
            academicRankings.push(college.academicRanking);
        }
    
    
        let worst = Math.max(...academicRankings);
        let best = Math.min(...academicRankings);

        let range = worst - best;

        for(let college of colleges) {
            if(college.academicRanking === 0) {
                console.log(college.name, college.academicRanking);
            }
        }
        

        console.log('academic scores');
        console.log('best', best);
        console.log('worst',worst);
        console.log('range', range)
    
         for(let college of colleges) {
            score  = 10 - ((college.academicRanking - best)/range) * 9;
            console.log(score.toFixed(2));
            /* college. = parseFloat(score.toFixed(2)); */
            let res = await college.save();
        } 
    }
    const getTuitionScores = async () => {
        const tuitionFees = [];

        for(let college of colleges) {
            tuitionFees.push(college.tuitionFee);
        }
    
    
        let maxFee = Math.max(...tuitionFees);
        let minFee = Math.min(...tuitionFees);
        let range = maxFee - minFee;

        const getMean = () => {
            let total = 0
            for(let fee of tuitionFees) {
                total = total + fee;
            }
    
            const mean = total/tuitionFees.length;
            return parseInt(mean);
        }
        console.log('tuition scores');
        console.log('min',minFee);
        console.log('mean',getMean());
        console.log('max',maxFee);
        console.log('range', range)
    
        setTimeout(async ()=> {
            for(let college of colleges) {
                score  = 10 - ((college.tuitionFee - minFee)/range) * 9;
                college.tuitionScore = parseFloat(score.toFixed(2));
                let res = await college.save();
            }
        }, 5000)
      
    }
   getAcademicScores();
   

}

module.exports = {estimateScores};