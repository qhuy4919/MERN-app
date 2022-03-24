import namor from 'namor';
import moment from 'moment';

const range = len => {
    const arr: number[] = [];
    for(let i: number = 0 ; i < len ; ++i) {
        arr.push(i);
    }
    return arr;
};


const newHighlights = () => {
    return {
        year:  moment(new Date(+(new Date()) - Math.floor(Math.random()*10e6))).format('YYYY'),
        servicArea: namor.generate({words: 4, numbers: 2}),
        monthlyPremium: Math.floor(Math.random() * 10e6),
        dental: namor.generate({words: 4, numbers: 3}),
        hearing: namor.generate({words: 4, numbers: 3}),
        vision: namor.generate({words: 4, numbers: 3}),
        temp: namor.generate({words: 4, numbers: 3})
    }
}

export function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return range(len).map(d => {
        return {
          ...newHighlights(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
      })
    }
  
    return makeDataLevel()
  }