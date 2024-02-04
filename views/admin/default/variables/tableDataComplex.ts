type RowObj = {
	name: string;
	status: string;
	date: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'Pest Analysis',
		progress: 75.5,
		status: 'Active',
		date: '12 Jan 2024'
	},
	{
		name: 'Soil Moisture Tester',
		progress: 25.5,
		status: 'Disable',
		date: '21 Feb 2024'
	},
	{
		name: 'Temperature Measurement',
		progress: 90,
		status: 'Active',
		date: '13 Mar 2024'
	},
	{
		name: 'Disease Analytics Device',
		progress: 50.5,
		status: 'Active',
		date: '24 Oct 2024'
	}
];
export default tableDataComplex;