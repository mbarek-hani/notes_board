import { useEffect, useMemo, useState } from "react";
import Spinner from "../components/icons/Spinner";
import { Link } from "react-router-dom";
import { getAllUsers } from "../api";
import type { Note, User, Stats } from "../types";
import { initialsFromEmail } from "../utils";

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

import { Bar, Line } from "react-chartjs-2";
import { toast } from "react-toastify";

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
	const rawNotes: Note[] = [];
	const [stats, setStats] = useState<Stats>(defaultStats);
	const [users, setUsers] = useState<User[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [errUsers, setErrUsers] = useState<string | null>(null);

	const [search, setSearch] = useState("");

	// current user (simple)
	const currentEmail =
		localStorage.getItem("email") ||
		localStorage.getItem("userEmail") ||
		localStorage.getItem("userName") ||
		"";
	const currentInitials = initialsFromEmail(currentEmail);

	useEffect(() => {
		console.log("effect: fetching users");
		(async () => {
			try {
				setLoadingUsers(true);
				setErrUsers(null);

				const data = await getAllUsers();
				setUsers(data);
			} catch (error) {
				let message = "Error: ";
				if (error instanceof Error) {
					message += error.message;
				} else {
					message += "Uknown error occured";
				}
				toast.error(message);
				setErrUsers(message);
			} finally {
				setLoadingUsers(false);
			}
		})();
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

		for (const n of rawNotes) {
			if (!n.createdAt) continue;
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

	// ----------- USERS (bottom) -----------

	const notesCountByUser = useMemo(() => {
		const map: Record<string, number> = {};
		for (const u of users) {
			map[u._id] = 0;
		}
		return map;
	}, [users]);

	const filteredUsers = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return users;
		return users.filter((u) => {
			const email = (u.email ?? "").toLowerCase();
			const role = (u.role ?? "").toLowerCase();
			return email.includes(q) || role.includes(q);
		});
	}, [users, search]);

	const isLoading = loadingUsers;

	return (
		<div className="dashboard">
			{/* HEADER */}
			<div className="topHeader">
				<div className="topHeader-left-side">
					<h1 style={{ margin: 0, fontSize: 22, letterSpacing: 0.2 }}>
						Dashboard
					</h1>

					<div className="searchBox">
						<span style={{ fontSize: 16, opacity: 0.7 }}>Search</span>
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="notes, color id, user email, role…"
							className="searchInput"
						/>
					</div>
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
					<Link to="/notes">
						<button className="btnStyle">Notes</button>
					</Link>
					<button
						type="button"
						className="btnStyle"
						onClick={() => window.location.reload()}
					>
						Refresh
					</button>

					<div title={currentEmail || "Guest"} className="userBadge">
						{currentInitials}
					</div>
				</div>
			</div>

			{isLoading && (
				<div className="cardStyle">
					<Spinner color="#333" />
				</div>
			)}

			{!isLoading && errUsers && (
				<div
					className="cardStyle"
					style={{ border: "1px solid rgba(239,68,68,0.35)" }}
				>
					<h3 style={{ marginTop: 0 }}>Some data couldn’t load</h3>
					{errUsers && <p style={{ margin: "6px 0" }}>Users: {errUsers}</p>}
					<p style={{ marginTop: 10, opacity: 0.75 }}>
						Users section requires a backend route like <code>/api/users</code>.
					</p>
				</div>
			)}

			{!isLoading && (
				<>
					{/* KPI CARDS */}
					<section className="kpiGrid">
						<Stat
							title="Total notes"
							value={stats.total}
							bg="rgba(99, 102, 241, 0.95)"
						/>
						<Stat
							title="Created today"
							value={stats.createdToday}
							bg="rgba(16, 185, 129, 0.95)"
						/>
						<Stat
							title="Created this week"
							value={stats.createdThisWeek}
							bg="rgba(245, 158, 11, 0.95)"
						/>
						<Stat
							title="Updated today"
							value={stats.updatedToday}
							bg="rgba(59, 130, 246, 0.95)"
						/>
						<Stat
							title="With text"
							value={stats.withBody}
							bg="rgba(31, 41, 55, 0.92)"
						/>
						<Stat
							title="Empty"
							value={stats.emptyBody}
							bg="rgba(148, 163, 184, 0.95)"
						/>
					</section>

					{/* CHARTS */}
					<section className="chartsGrid">
						<div className="cardStyle">
							<div className="cardHeaderRow">
								<h3 className="cardTitle">With text vs Empty</h3>
								<span className="cardBadge">quality</span>
							</div>
							<div style={{ height: 220 }}>
								<Bar data={contentBarData} options={chartOptionsBase} />
							</div>
						</div>

						<div className="cardStyle">
							<div className="cardHeaderRow">
								<h3 className="cardTitle">Activity</h3>
								<span className="cardBadge">today / week</span>
							</div>
							<div style={{ height: 220 }}>
								<Bar data={activityBarData} options={chartOptionsBase} />
							</div>
						</div>

						<div className="cardStyle">
							<div className="cardHeaderRow">
								<h3 className="cardTitle">Created trend</h3>
								<span className="cardBadge">last 7 days</span>
							</div>
							<div style={{ height: 220 }}>
								<Line data={createdLineData()} options={chartOptionsBase} />
							</div>
						</div>
					</section>
				</>
			)}

			{/* USERS TABLE */}
			<section style={{ marginTop: 14 }}>
				<div className="cardStyle">
					<div className="cardHeaderRow">
						<h3 className="cardTitle">Users</h3>
						<span className="cardBadge">
							{loadingUsers ? (
								<Spinner color="#333" />
							) : (
								`${filteredUsers.length} users`
							)}
						</span>
					</div>

					{loadingUsers ? (
						<p style={{ margin: 0, opacity: 0.75 }}>
							<Spinner color="#333" />
						</p>
					) : errUsers ? (
						<p style={{ margin: 0, opacity: 0.85 }}>
							Users not available. Add a backend route like{" "}
							<code>GET /api/users</code>.
						</p>
					) : filteredUsers.length === 0 ? (
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
										const total = notesCountByUser[u._id] ?? 0;
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
															style={{ fontFamily: "monospace", opacity: 0.8 }}
														>
															{u._id.slice(0, 8)}…
														</span>
													</div>
												</td>
												<td className="tdStyle">{u.email ?? "—"}</td>
												<td className="tdStyle">{u.role ?? "—"}</td>
												<td className="tdStyle">
													<b>{total}</b>
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
		</div>
	);
}

function Stat({
	title,
	value,
	bg,
}: {
	title: string;
	value: string | number;
	bg: string;
}) {
	return (
		<div className="kpiCard" style={{ background: bg }}>
			<div style={{ fontSize: 12, opacity: 0.9 }}>{title}</div>
			<div style={{ fontSize: 26, fontWeight: 800, marginTop: 8 }}>{value}</div>
		</div>
	);
}
