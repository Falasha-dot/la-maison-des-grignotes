/* ============================================================
   SUPABASE — connexion et récupération des contenus dynamiques
   ============================================================
   Ce fichier prépare l'intégration Supabase pour La Maison des
   Grignote. Tant que les identifiants ne sont pas renseignés,
   le site continue de fonctionner avec le contenu HTML statique
   (données de démonstration) déjà présent dans la page.

   Pour activer Supabase :
   1. Ajoutez le script CDN dans index.html :
      <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
      (à placer AVANT ce fichier)
   2. Renseignez SUPABASE_URL et SUPABASE_ANON_KEY ci-dessous.
   3. Décommentez les appels dans initSupabaseContent().
   ============================================================ */

const SUPABASE_URL = ""; // ex: "https://xxxxx.supabase.co"
const SUPABASE_ANON_KEY = ""; // clé publique "anon" du projet

let supabaseClient = null;

function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (typeof window.supabase === "undefined") {
    console.warn("Supabase JS SDK non chargé. Ajoutez le script CDN dans index.html.");
    return null;
  }
  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

/**
 * Récupère les prestations actives, triées par catégorie.
 * Table attendue : prestations (id, nom, description, categorie, prix, image_url, actif)
 */
async function fetchPrestations(categorie) {
  const client = getSupabaseClient();
  if (!client) return null;

  let query = client.from("prestations").select("*").eq("actif", true);
  if (categorie) query = query.eq("categorie", categorie);

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) {
    console.error("Erreur Supabase (prestations) :", error.message);
    return null;
  }
  return data;
}

/**
 * Récupère les éléments de galerie actifs.
 * Table attendue : galerie (id, titre, description, image_url, categorie, actif)
 */
async function fetchGalerie() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from("galerie")
    .select("*")
    .eq("actif", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur Supabase (galerie) :", error.message);
    return null;
  }
  return data;
}

/**
 * Récupère les témoignages actifs.
 * Table attendue : temoignages (id, nom, commentaire, note, photo_url, actif)
 */
async function fetchTemoignages() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from("temoignages")
    .select("*")
    .eq("actif", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur Supabase (témoignages) :", error.message);
    return null;
  }
  return data;
}

/**
 * Récupère les informations générales du site (coordonnées, réseaux...).
 * Table attendue : informations_site
 */
async function fetchInformationsSite() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client.from("informations_site").select("*").limit(1).single();
  if (error) {
    console.error("Erreur Supabase (informations_site) :", error.message);
    return null;
  }
  return data;
}

/**
 * Point d'entrée : tente de charger le contenu dynamique.
 * Si Supabase n'est pas configuré, ne fait rien et laisse le
 * contenu statique du HTML tel quel.
 */
async function initSupabaseContent() {
  const client = getSupabaseClient();
  if (!client) return; // Mode démonstration : contenu statique conservé

  // Exemple d'utilisation une fois Supabase configuré :
  // const prestationsPatisserie = await fetchPrestations("patisserie");
  // const galerie = await fetchGalerie();
  // const temoignages = await fetchTemoignages();
  // -> injecter dynamiquement ces données dans le DOM ici.
}

document.addEventListener("DOMContentLoaded", initSupabaseContent);
