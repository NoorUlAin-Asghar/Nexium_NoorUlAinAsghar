import supabase from './supabaseClient'

// Add a summary if the URL doesn't already exist
export async function addSummary(url, English, Urdu) {
  try {
    const { error } = await supabase
      .from('summary')
      .insert([{ url, english: English, urdu: Urdu }], { upsert: false })

    if (error) throw error
    console.log("Added to DB")
  } catch (err) {
    console.error("Insert error:", err.message)
  }
}

// Get all summaries from the DB
export async function getAllSummaries() {
  try {
    const { data, error } = await supabase
      .from('summary')
      .select('url, english, urdu')
      .order('id', { ascending: false })

    if (error) throw error
    console.log(data)
    return data
  } catch (err) {
    console.error("Fetch error:", err.message)
    return []
  }
}
