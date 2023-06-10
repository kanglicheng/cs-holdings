"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = __importDefault(require("react"));
const client_1 = require("./client");
//LogRocket.init('6gzskl/cs-holdings-prod');
function App() {
    // Manage login state
    const [session, setSession] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        client_1.supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        client_1.supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    const logout = async () => {
        await client_1.supabase.auth.signOut();
    };
}
exports.default = App;
//# sourceMappingURL=App.js.map