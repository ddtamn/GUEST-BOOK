const data = [
	{
		name: 'ADE NURAMDANI, SH., S.I.K., M.M',
		type: 'VIP 1',
		description: 'KAPOLRES BANGGAI'
	},
	{
		name: 'MUH KHAIRIL AKBAR',
		type: 'VIP 1',
		description: ''
	},
	{
		name: 'SATOMY SUWARDI DUNGGA',
		type: 'VIP 1',
		description: 'PIMPINAN BNI CABANG LUWUK'
	},
	{
		name: 'IR. H. AMIRUDIN TAMOREKA',
		type: 'VIP 1',
		description: 'BUPATI BANGGAI'
	},
	{
		name: 'BAMBANG SUTEDDY',
		type: 'VIP 1',
		description: 'KEPAL DINAS PUPR'
	},
	{
		name: 'INDRAMULIA HENDRO SUNDAH',
		type: 'VIP 1',
		description: 'PEMIMPIN PEMASARAN'
	},
	{
		name: 'FEISAL MUHAMMAD IQBAL',
		type: 'VIP 1',
		description: 'PIMPINAN KCP TOILI'
	},
	{
		name: 'BEBY KOBSTAN',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'FERRY YOPAN',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'NI CANOR MAGALIN',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'FRENGKY MAGALIN',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'THOMMY WIJAYA',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'AGUS',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'REGA',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'AAM',
		type: 'VIP 2',
		description: ''
	},
	{
		name: 'KORNELIUS ADITYA BAGUS SETIANTO, STRK',
		type: 'VIP 3',
		description: 'KANIT III SPKT'
	},
	{
		name: 'DICKY ARMANA SURBAKTI, S.T.K., S.I.K.M.H',
		type: 'VIP 3',
		description: 'KASAT RESKRIM'
	},
	{
		name: 'BAGAS TRIANTIO SANJAYA S.Tr.K',
		type: 'VIP 3',
		description: 'KANIT IDIK II SAT RESKRIM'
	},
	{
		name: 'I MADE BAGUS ADITYA M., S.T.K., S.I.K., M.A.I.C.',
		type: 'VIP 3',
		description: 'KASAT LANTAS'
	},
	{
		name: 'ANDRIANSYAH ARTHADANA S TR K',
		type: 'VIP 3',
		description: 'PS. KAPOLSEK BATUI'
	},
	{
		name: 'MOH HARIYATNO',
		type: 'VIP 3',
		description: 'AJUDAN BUPATI'
	},
	{
		name: 'YANTO L BALUBI',
		type: 'VIP 3',
		description: 'KASAT INTEL KODIM'
	},
	{
		name: 'RAHMAT BALUBI',
		type: 'VIP 3',
		description: 'INTEL'
	},
	{ name: 'HASMAN L BALUBI SH', type: 'VIP 4', description: '' },
	{ name: 'HI LABELO', type: 'VIP 4', description: '' },
	{ name: 'HI SAMIUN L.AGI SAG', type: 'VIP 4', description: '' },
	{ name: 'HJ MEITA YINATA', type: 'VIP 4', description: '' },
	{ name: 'HJ HAYATI', type: 'VIP 4', description: '' },
	{ name: 'MARSIDIN', type: 'VIP 4', description: '' },
	{ name: 'AGUS DARMALANTE', type: 'VIP 4', description: '' },
	{ name: 'ANGGO NUGRAHA', type: 'VIP 5', description: '' },
	{ name: 'ZELPIA ARYA', type: 'VIP 5', description: '' },
	{ name: 'RIAN INGGRIANI', type: 'VIP 5', description: '' },
	{ name: 'SAMRIAH', type: 'VIP 6', description: '' },
	{ name: 'RUBIA', type: 'VIP 6', description: '' },
	{ name: 'AA EFENDI', type: 'VIP 6', description: '' },
	{ name: 'SUKARNI', type: 'VIP 6', description: '' },
	{ name: 'HJ RAMPIA LAAMIRI', type: 'VIP 6', description: '' },
	{ name: 'HJ RAMSIAH LAAMIRI', type: 'VIP 6', description: '' },
	{ name: 'HASNI INE', type: 'VIP 6', description: '' },
	{ name: 'SAUDAHLIA', type: 'VIP 6', description: '' },
	{ name: 'SRI EVA SUSANTI K', type: 'GUEST TABLE 1', description: 'PEMIMPIN KK BATUI' },
	{ name: 'RAMDHAN', type: 'GUEST TABLE 1', description: 'AUDIT' },
	{ name: 'INDRI', type: 'GUEST TABLE 1', description: 'RBC' },
	{
		name: 'ALDONA DESITA LASAMPA',
		type: 'GUEST TABLE 1',
		description: 'PENYELIA KREDIT LUWUK'
	},
	{ name: 'MUAMMAR MOIDADY', type: 'GUEST TABLE 1', description: 'PENYELIA FUNDING OFFICER' },
	{ name: 'JUANG', type: 'GUEST TABLE 1', description: 'PENYELIA COSTUMER SERVICE' },
	{ name: 'LIANDY LOLOANG', type: 'GUEST TABLE 1', description: 'PENYELIA TELLER' },
	{ name: 'CELSIA RUMINTJAP', type: 'GUEST TABLE 1', description: 'PENYELIA UMUM' },
	{ name: 'DJEYNAL PIARA', type: 'GUEST TABLE 1', description: 'PENYELIA ADC' },
	{ name: 'HARIYANTO', type: 'GUEST TABLE 1', description: 'PENYELIA KREDIT TOILI' },
	{ name: 'LALU F HIDAYAT', type: 'GUEST TABLE 1', description: 'PEMPIMPIN KCP BATUI' },
	{ name: 'MARESIL OMEGA', type: 'GUEST TABLE 2', description: '' },
	{ name: 'ADE KALASANG', type: 'GUEST TABLE 2', description: '' },
	{ name: 'NINING', type: 'GUEST TABLE 2', description: '' },
	{ name: 'ANDINI WAHYUNI ADEL', type: 'GUEST TABLE 2', description: '' },
	{ name: 'ERVABELLA', type: 'GUEST TABLE 2', description: '' },
	{ name: 'JECLIN CAROLIN', type: 'GUEST TABLE 2', description: '' },
	{ name: 'EVHY DOE', type: 'GUEST TABLE 2', description: '' },
	{ name: 'ANISA SALSABILA TANGAHU', type: 'GUEST TABLE 2', description: '' },
	{ name: 'MORISCA', type: 'GUEST TABLE 2', description: '' },
	{ name: 'WINNY', type: 'GUEST TABLE 2', description: '' },
	{ name: 'VALENCIA HANTUMA', type: 'GUEST TABLE 3', description: '' },
	{ name: 'KURNIA', type: 'GUEST TABLE 3', description: '' },
	{ name: 'WIRATAMA PITARATU', type: 'GUEST TABLE 3', description: '' },
	{ name: 'TRY ANUGRAH', type: 'GUEST TABLE 3', description: '' },
	{ name: 'ARINI IRIANA', type: 'GUEST TABLE 3', description: '' },
	{ name: 'BAYU & TANTI', type: 'GUEST TABLE 3', description: '' },
	{ name: 'MAGFIRAH MAKDUKALLANG', type: 'GUEST TABLE 3', description: '' },
	{ name: 'NOOR MUH RISKY', type: 'GUEST TABLE 3', description: '' },
	{ name: 'JACKO TAMOWONGKAY', type: 'GUEST TABLE 3', description: '' },
	{ name: 'SANDRA', type: 'GUEST TABLE 3', description: '' },
	{ name: 'GLADIES NAOMI MAMESAH', type: 'GUEST TABLE 4', description: '' },
	{ name: 'STEFANI SANDANGAN', type: 'GUEST TABLE 4', description: '' },
	{ name: 'IMELDA PONSON', type: 'GUEST TABLE 4', description: '' },
	{ name: 'UPIK KARMILA', type: 'GUEST TABLE 4', description: '' },
	{ name: 'PUTU SUDIKA', type: 'GUEST TABLE 4', description: '' },
	{ name: 'ANNISA', type: 'GUEST TABLE 4', description: '' },
	{ name: 'RISMANTO', type: 'GUEST TABLE 4', description: '' },
	{ name: 'RIRIN WIDIYANTI', type: 'GUEST TABLE 4', description: '' },
	{ name: 'YUSTIWI', type: 'GUEST TABLE 4', description: '' },
	{ name: 'RYAN ANGGORO', type: 'GUEST TABLE 4', description: '' },
	{ name: 'LILI SUONG', type: 'KELUARGA', description: '' },
	{ name: 'JEMRIS', type: 'KELUARGA', description: '' },
	{ name: 'HI NAIM L ADI', type: 'KELUARGA', description: '' },
	{ name: 'LA URI', type: 'KELUARGA', description: '' },
	{ name: 'SALE', type: 'KELUARGA', description: '' },
	{ name: 'HI JAFAR', type: 'KELUARGA', description: '' },
	{ name: 'H RUSLAN L DUHU', type: 'KELUARGA', description: '' },
	{ name: 'H SYAIFUL BAHRI H AKIL', type: 'KELUARGA', description: '' },
	{ name: 'LA INSE', type: 'KELUARGA', description: '' },
	{ name: 'ASWADI', type: 'KELUARGA', description: '' },
	{ name: 'RAMDAN LAMIMU', type: 'KELUARGA', description: '' },
	{ name: 'IBRAHIM LAMIMU', type: 'KELUARGA', description: '' },
	{ name: 'RISALDI', type: 'KELUARGA', description: '' },
	{ name: 'RAMLAN', type: 'KELUARGA', description: '' },
	{ name: 'HAMALUDIN SH', type: 'KELUARGA', description: '' },
	{ name: 'ULI', type: 'KELUARGA', description: '' },
	{ name: 'LA MUNA', type: 'KELUARGA', description: '' },
	{ name: 'LA IJI PANARI', type: 'KELUARGA', description: '' },
	{ name: 'H LAGAMBA', type: 'KELUARGA', description: '' },
	{ name: 'MARWAN', type: 'KELUARGA', description: '' },
	{ name: 'HALIS', type: 'KELUARGA', description: '' },
	{ name: 'HJ HASNA', type: 'KELUARGA', description: '' },
	{ name: 'ISDAR', type: 'KELUARGA', description: '' },
	{ name: 'DIRAN', type: 'KELUARGA', description: '' },
	{ name: 'TIN KINGSAPADU', type: 'KELUARGA', description: '' },
	{ name: 'IMRAN L DIMONIU', type: 'KELUARGA', description: '' },
	{ name: 'IRFAN LAQUI', type: 'KELUARGA', description: '' },
	{ name: 'ARFA', type: 'KELUARGA', description: '' },
	{ name: 'RAHMAN LAMIMU', type: 'KELUARGA', description: '' },
	{ name: 'MUHLIS LAKUBA', type: 'KELUARGA', description: '' },
	{ name: 'WATI', type: 'KELUARGA', description: '' },
	{ name: 'ROSMIATI LAMIMU', type: 'KELUARGA', description: '' },
	{ name: 'GULULI', type: 'KELUARGA', description: '' },
	{ name: 'SARUHU', type: 'KELUARGA', description: '' },
	{ name: 'FITRI MAHIWA', type: 'KELUARGA', description: '' },
	{ name: 'GUSMAN', type: 'KELUARGA', description: '' },
	{ name: 'DIRGA DARMALANTE', type: 'KELUARGA', description: '' },
	{ name: 'ACHA M SALEH', type: 'KELUARGA', description: '' },
	{ name: 'INDRAWATI (FEMI)', type: 'KELUARGA', description: '' },
	{ name: 'OVHIL KURNIAWAN', type: 'KELUARGA', description: '' },
	{ name: 'HI ARIFIN', type: 'KELUARGA', description: '' },
	{ name: 'OM URA', type: 'KELUARGA', description: '' }
];

export default data;
