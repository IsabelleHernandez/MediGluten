
const SUPABASE_URL = "https://xbyuusbcgmcaexwyyjdr.supabase.co";

const SUPABASE_KEY = "sb_publishable_-ZVhr6Xa3E0vf4YU_X7r8Q_wBXRpZ_Y";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
