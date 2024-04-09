import AsyncStorage from '@react-native-async-storage/async-storage'

const saveRecentlyProduct = async (id) => {
    try {
        
        let savedRecentlyProductId = await AsyncStorage.getItem("savedProductIds");
        
        savedRecentlyProductId = savedRecentlyProductId ? JSON.parse(savedRecentlyProductId) : [];

        const index = savedRecentlyProductId.indexOf(id);
        
        if (index !== -1) {
            savedRecentlyProductId.splice(index, 1);
        } else {
            if (savedRecentlyProductId.length === 10) {
                savedRecentlyProductId.pop();
            }
        }
        
        savedRecentlyProductId.unshift(id);
        // Lưu mảng id đã cập nhật vào AsyncStorage
        await AsyncStorage.setItem("savedProductIds", JSON.stringify(savedRecentlyProductId));
        console.log('Successfully saved recently product ID');

    } catch (error) {
        console.error('Error saving recently product ID:', error);
    }
};


export default saveRecentlyProduct;
