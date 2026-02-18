function Stat({ title, value }: { title: string; value: string | number }) {
	return (
		<div className="kpiCard">
			<div style={{ fontSize: 12, opacity: 0.9 }}>{title}</div>
			<div style={{ fontSize: 26, fontWeight: 800, marginTop: 8 }}>{value}</div>
		</div>
	);
}

export default Stat;
