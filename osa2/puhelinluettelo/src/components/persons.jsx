import axios from 'axios'

const Persons = () => {

    axios
        .get('/api/persons')
        .then(response => {
            const persons = response.data
            console.log(persons)
        })

    return (null);
};

export default Persons;