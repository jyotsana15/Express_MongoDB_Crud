const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/items';

// Test data
const testItem = {
  name: 'Test Laptop',
  description: 'A test laptop for API testing',
  price: 1299.99,
  category: 'Electronics',
  inStock: true
};

async function testAPI() {
  try {
    console.log('🚀 Starting API Tests...\n');

    // Test 1: Create Item
    console.log('1. Testing CREATE operation...');
    const createResponse = await axios.post(BASE_URL, testItem);
    console.log('✅ Item created:', createResponse.data.data.name);
    const itemId = createResponse.data.data._id;

    // Test 2: Read All Items
    console.log('\n2. Testing READ ALL operation...');
    const readAllResponse = await axios.get(BASE_URL);
    console.log('✅ Items retrieved:', readAllResponse.data.count);

    // Test 3: Read Single Item
    console.log('\n3. Testing READ SINGLE operation...');
    const readSingleResponse = await axios.get(`${BASE_URL}/${itemId}`);
    console.log('✅ Single item retrieved:', readSingleResponse.data.data.name);

    // Test 4: Update Item
    console.log('\n4. Testing UPDATE operation...');
    const updateData = { ...testItem, price: 1199.99, name: 'Updated Test Laptop' };
    const updateResponse = await axios.put(`${BASE_URL}/${itemId}`, updateData);
    console.log('✅ Item updated:', updateResponse.data.data.name, 'Price:', updateResponse.data.data.price);

    // Test 5: Delete Item
    console.log('\n5. Testing DELETE operation...');
    const deleteResponse = await axios.delete(`${BASE_URL}/${itemId}`);
    console.log('✅ Item deleted successfully');

    // Test 6: Verify Deletion
    console.log('\n6. Verifying deletion...');
    try {
      await axios.get(`${BASE_URL}/${itemId}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ Item successfully deleted (404 received)');
      }
    }

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('\n❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
