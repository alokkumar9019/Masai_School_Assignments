const students = [
  { name: ' Alice Cooper ', score: 85 },
  { name: 'bob alice', score: 42 },
  { name: 'Alice Wonderland', score: 70 },
  { name: ' david', score: 30 }
];

const result = processData(students);
console.log(result);
// Output:
// { 
//   totalPassed: 2,
//   students: [
//     { name: 'ALICE COOPER', score: 85, rank: 1 },
//     { name: 'ALICE WONDERLAND', score: 70, rank: 2 }
//   ]
// }

function processData(students){
    students=students.filter((s)=>{
        return s.name.includes("Alice") && s.score>50;
    });
    students.sort((a,b)=>{
        return b.score-a.score;
    })
    students=students.map((s,i,students)=>{
        s.rank=i+1;
        s.name=s.name.trim().toUpperCase();
        return s;
    })
    let totalPassed= students.reduce((acc,curr)=> {
        acc=curr.rank;
        return acc;
    },0);
    
    return {
        totalPassed,
        students,
    }
}