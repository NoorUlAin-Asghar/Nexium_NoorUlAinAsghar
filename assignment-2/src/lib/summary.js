import supabase from './supabaseClient'

// Add a new summary unconditionally (assumes caller checks for duplicates)
export async function addSummary(url, English, Urdu) {
  try {
    const { error } = await supabase
      .from('summary')
      .insert([{ url, english: English, urdu: Urdu }]);

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    console.log("Added to DB");
  } catch (err) {
    console.error("Add summary error:", err.message);
    throw err; 
  }
}



// Get all summaries from the DB
export async function getAllSummaries() {
  try {
    const { data, error } = await supabase
      .from('summary')
      .select('url, english, urdu')
      .order('id', { ascending: false })

      console.log("Summaries fetched: ",data)
    if (error) {
      console.log("Unable to fetch summaries, ", error)
      throw error
    }
    return data

  } catch (err) {
    console.error("Fetch error:", err.message)
    return []
  }
}

// Check if a summary exists for the URL; return full data if found, else null
export async function getSummaryByUrl(url) {
  try {
    const { data, error } = await supabase
      .from('summary')
      .select('url, english, urdu')
      .eq('url', url)
      .single();

    if (error && error.code === 'PGRST116') {
      // Not found
      return null;
    }

    if (error) {
      console.error("Error checking summary:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return null;
  }
}
