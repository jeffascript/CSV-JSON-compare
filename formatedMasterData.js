import masterdata from './masterdata.json';

const response = masterdata.map(({ id }) => id); // .map(x=> x.id)

export default response;
