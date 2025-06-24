
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmcyqhjrdfhfdzpupryj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtY3lxaGpyZGZoZmR6cHVwcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODUzNDksImV4cCI6MjA2NjI2MTM0OX0.bTzqo4k60Zg6vDdF8-lZiNQkaCIWBtHRYNLPGX6d5lE'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Main function to save a complete entry
export const saveFullEntry = async () => {
  try {
    console.log('Starting saveFullEntry...')
    
    // Step 1: Insert into functions table
    console.log('Step 1: Inserting into functions table...')
    const { data: functionData, error: functionError } = await supabase
      .from('functions')
      .insert([
        {
          customer_name: 'Arun Pandian',
          mobile: '9876543210',
          function_type: 'Wedding',
          date_of_function: '2025-07-01',
          venue: 'Sivakasi'
        }
      ])
      .select()
      .single()

    if (functionError) {
      console.error('Error inserting function:', functionError)
      throw functionError
    }

    console.log('Function inserted successfully:', functionData)
    const functionId = functionData.id

    // Step 2: Insert guests using the generated function_id
    console.log('Step 2: Inserting guests with function_id:', functionId)
    const { data: guestsData, error: guestsError } = await supabase
      .from('guests')
      .insert([
        {
          function_id: functionId,
          guest_name: 'Rajesh',
          native_place: 'Virudhunagar',
          amount: 1000,
          payment_mode: 'Cash'
        },
        {
          function_id: functionId,
          guest_name: 'Santhosh',
          native_place: 'Chennai',
          amount: 1500,
          payment_mode: 'UPI'
        }
      ])
      .select()

    if (guestsError) {
      console.error('Error inserting guests:', guestsError)
      throw guestsError
    }

    console.log('Guests inserted successfully:', guestsData)
    console.log('saveFullEntry completed successfully!')
    
    return {
      success: true,
      functionData,
      guestsData
    }

  } catch (error) {
    console.error('saveFullEntry failed:', error)
    return {
      success: false,
      error
    }
  }
}
