import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
	const token = req.cookies.token;

	if (!token) return res.status(401).json({ message: "Not authorized" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch {
		res.status(401).json({ message: "Token invalide ou expire" });
	}
}

export default authenticateToken;
