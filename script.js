const SUPABASE_URL = "https://ghgnpbunnjzuopcxocqa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

if (!localStorage.getItem("wakakusa_logged_in")) {
  location.href = "login.html";
}

function logout() {
  localStorage.removeItem("wakakusa_logged_in");
  location.href = "login.html";
}

async function createThread() {
  const name = document.getElementById("name").value || "名無しさん";
  const content = document.getElementById("content").value;
  const url = new URL(window.location.href);
  const board_id = url.searchParams.get("board_id");

  const { data, error } = await supabase.from("threads").insert([{ name, content, board_id }]);
  if (!error) location.reload();
}

async function submitComment() {
  const url = new URL(window.location.href);
  const thread_id = url.searchParams.get("id");
  const name = document.getElementById("name").value || "名無しさん";
  const content = document.getElementById("content").value;

  const { data, error } = await supabase.from("comments").insert([{ name, content, thread_id }]);
  if (!error) location.reload();
}