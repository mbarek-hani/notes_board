import { useEffect, useMemo, useState } from "react";
import Spinner from "../components/icons/Spinner";
import Stat from "../components/dashboard/Stat";
import Chart from "../components/dashboard/Chart";
import { getAllUsers, getNotesCreatedLast7Days, getStats } from "../api";
import type { User, Stats } from "../types";
import { initialsFromEmail } from "../utils";
import { Bar, Line } from "react-chartjs-2";
import { toast } from "react-toastify";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import Header from "../components/dashboard/Header";
import Search from "../components/dashboard/Search";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Tooltip,
	Legend,
	Filler,
);

const defaultStats: Stats = {
	total: 0,
	withBody: 0,
	emptyBody: 0,
	createdToday: 0,
	createdThisWeek: 0,
	updatedToday: 0,
};

export default function Dashboard() {
	const [lastCreatedAt, setLastCreatedAt] = useState<
		{ _id: string; createdAt: string }[]
	>([]);
	const [stats, setStats] = useState<Stats>(defaultStats);
	const [users, setUsers] = useState<(User & { totalNotes: number })[]>([]);
	const [loading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [search, setSearch] = useState("");

	// current user (simple)
	const currentEmail = localStorage.getItem("email") || "";

	const fetchData = async () => {
		try {
			setLoading(true);
			setIsError(false);

			const [usersResponse, notesCreatedInTheLast7DaysResponse, statsResponse] =
				await Promise.all([
					getAllUsers(),
					getNotesCreatedLast7Days(),
					getStats(),
				]);
			setUsers(usersResponse);
			setLastCreatedAt(notesCreatedInTheLast7DaysResponse);
			setStats(statsResponse);
		} catch (error) {
			let message = "Error: ";
			if (error instanceof Error) {
				message += error.message;
			} else {
				message += "Uknown error occured";
			}
			toast.error(message);
			setIsError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// ----------- CHARTS (clean style) -----------

	const chartOptionsBase = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: { enabled: true },
			},
			scales: {
				x: {
					grid: { display: false },
					ticks: { color: "#98A2B3", font: { size: 11 } },
				},
				y: {
					grid: { color: "rgba(152, 162, 179, 0.18)" },
					ticks: { color: "#98A2B3", font: { size: 11 } },
				},
			},
		}),
		[],
	);

	const contentBarData = useMemo(() => {
		return {
			labels: ["With text", "Empty"],
			datasets: [
				{
					label: "Notes content",
					data: [stats.withBody, stats.emptyBody],
					borderRadius: 10,
					backgroundColor: [
						"rgba(99, 102, 241, 0.85)",
						"rgba(148, 163, 184, 0.85)",
					],
					borderWidth: 0,
				},
			],
		};
	}, [stats.withBody, stats.emptyBody]);

	const activityBarData = useMemo(() => {
		return {
			labels: ["Created today", "Updated today", "Created this week"],
			datasets: [
				{
					label: "Activity",
					data: [stats.createdToday, stats.updatedToday, stats.createdThisWeek],
					borderRadius: 10,
					backgroundColor: [
						"rgba(16, 185, 129, 0.85)",
						"rgba(59, 130, 246, 0.85)",
						"rgba(245, 158, 11, 0.85)",
					],
					borderWidth: 0,
				},
			],
		};
	}, [stats.createdToday, stats.updatedToday, stats.createdThisWeek]);

	const createdLineData = () => {
		const days = 7;
		const labels: string[] = [];
		const counts = new Array(days).fill(0);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		for (let i = days - 1; i >= 0; i--) {
			const d = new Date(today);
			d.setDate(today.getDate() - i);
			labels.push(d.toLocaleDateString());
		}

		for (const n of lastCreatedAt) {
			const d = new Date(n.createdAt);
			d.setHours(0, 0, 0, 0);
			const diffDays = Math.round((today.getTime() - d.getTime()) / 86400000);
			if (diffDays >= 0 && diffDays < days) {
				counts[days - 1 - diffDays] += 1;
			}
		}

		return {
			labels,
			datasets: [
				{
					label: "Created (7 days)",
					data: counts,
					tension: 0.35,
					fill: true,
					borderWidth: 2,
					borderColor: "rgba(99, 102, 241, 0.95)",
					backgroundColor: "rgba(99, 102, 241, 0.12)",
					pointRadius: 3,
					pointHoverRadius: 5,
					pointBackgroundColor: "rgba(99, 102, 241, 0.95)",
				},
			],
		};
	};

	const filteredUsers = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return users;
		return users.filter((u) => {
			const email = u.email.toLowerCase();
			const role = u.role.toLowerCase();
			return email.includes(q) || role.includes(q);
		});
	}, [users, search]);

	return (
		<div className="dashboard">
			{/* HEADER */}
			<Header email={currentEmail} fetchData={fetchData} />

			{loading && (
				<div
					style={{
						minHeight: "80vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Spinner size="100" />
				</div>
			)}

			{!loading && !isError && (
				<>
					{/* KPI CARDS */}
					<section className="kpiGrid">
						<Stat title="Total notes" value={stats.total} />
						<Stat title="Created today" value={stats.createdToday} />
						<Stat title="Created this week" value={stats.createdThisWeek} />
						<Stat title="Updated today" value={stats.updatedToday} />
						<Stat title="With text" value={stats.withBody} />
						<Stat title="Empty" value={stats.emptyBody} />
					</section>

					{/* CHARTS */}
					<section className="chartsGrid">
						<Chart title="With text vs Empty" badge="quality">
							<Bar data={contentBarData} options={chartOptionsBase} />
						</Chart>

						<Chart title="Activity" badge="today / week">
							<Bar data={activityBarData} options={chartOptionsBase} />
						</Chart>

						<Chart title="Created trend" badge="last 7 days">
							<Line data={createdLineData()} options={chartOptionsBase} />
						</Chart>
					</section>
				</>
			)}

			{/* USERS TABLE */}
			{!loading && !isError && (
				<section style={{ marginTop: 14 }}>
					<div className="cardStyle">
						<div className="cardHeaderRow">
							<h3 className="cardTitle">Users</h3>

							<Search
								search={search}
								handleSearch={(e) => setSearch(e.target.value)}
							/>

							<span className="cardBadge">{`${filteredUsers.length} users`}</span>
						</div>

						{filteredUsers.length === 0 ? (
							<p style={{ margin: 0, opacity: 0.75 }}>No users found.</p>
						) : (
							<div style={{ overflowX: "auto" }}>
								<table className="tableStyle">
									<thead>
										<tr>
											<th className="thStyle">User</th>
											<th className="thStyle">Email</th>
											<th className="thStyle">Role</th>
											<th className="thStyle">Total Notes</th>
										</tr>
									</thead>
									<tbody>
										{filteredUsers.map((u) => {
											const init = initialsFromEmail(u.email);
											return (
												<tr key={u._id}>
													<td className="tdStyle">
														<div
															style={{
																display: "flex",
																alignItems: "center",
																gap: 10,
															}}
														>
															<div className="userBadgeSmall">{init}</div>
															<span
																style={{
																	fontFamily: "monospace",
																	opacity: 0.8,
																}}
															>
																{u._id.slice(0, 8)}…
															</span>
														</div>
													</td>
													<td className="tdStyle">{u.email ?? "—"}</td>
													<td className="tdStyle">{u.role ?? "—"}</td>
													<td className="tdStyle">
														<b>{u.totalNotes}</b>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</section>
			)}
		</div>
	);
}
