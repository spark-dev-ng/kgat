export const getSchools= ()=> { 
    return [
        {name: 'Pre Nursery',code:'PN'},
        {name: 'Nursery School',code:'NU'},
        {name: 'Primary School',code:'PR'},
        {name: 'Junior Secondary',code:'JS'},
        {name: 'Senior Secondary',code:'SS'}
    ]
}

export const getClasses =()=>{

	return [
		{id:1,name:'Pre Nursery'},
		{id:2,name:'Nursery 1'},
		{id:3,name:'Nursery 2'},
		{id:4,name:'Primary 1'},
		{id:5,name:'Primary 2'},
		{id:6,name:'Primary 3'},
		{id:7,name:'Primary 4'},
		{id:8,name:'Primary 5'},
		{id:9,name:'Primary 6'},
		{id:10,name:'JS 1'},
		{id:11,name:'JS 2'},
		{id:12,name:'JS 3'},
		{id:13,name:'SS 1'},
		{id:14,name:'SS 2'},
		{id:15,name:'SS 3'}
	];

}
export const getClass =  getClasses
export const getSchool =  getSchools