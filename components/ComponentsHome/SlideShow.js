import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const images = [
    "https://marketplace.canva.com/EAFyaZev26A/1/0/1600w/canva-dark-grey-and-orange-modern-simple-food-promotion-banner-lAwz72GxmZA.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970571.jpg",
    "https://img.freepik.com/premium-psd/food-menu-restaurant-facebook-cover-template_106176-1375.jpg",
    "https://marketplace.canva.com/EAFmdz3kcO4/1/0/1600w/canva-orange-elegant-food-menu-banner-oC78A10Dm3M.jpg",
    "https://blog.lisi.menu/wp-content/uploads/2023/08/Food-Banner.jpg"
]

const SlideShow = () => {
    const [imgActive, setImgActive] = useState(0);
    const scrollViewRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const nextSlide = () => {
            // Sử dụng imgActive mới để xác định chỉ số ảnh tiếp theo
            const nextIndex = (imgActive + 1) % images.length;
            setImgActive(nextIndex); // Cập nhật imgActive
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    x: WIDTH * nextIndex,
                    animated: true,
                });
            }
        };

        intervalRef.current = setInterval(nextSlide, 3000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [imgActive]);

    onChange = (nativeEvent) =>{
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != imgActive){
                setImgActive(slide);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.wrap}>
                    {
                        images.map((e, index) =>
                            <Image
                                key={e}
                                resizeMode='stretch'
                                style={styles.wrap}
                                source={{ uri: e }}
                            />
                        )
                    }
                </ScrollView>
                <View style={styles.wrapDot}>
                    {
                        images.map((e, index) =>
                        <Text
                        key={e}
                        style={imgActive == index ? styles.dotActive : styles.dot}
                        ></Text>
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SlideShow

const styles = StyleSheet.create({
    container: {
        width:'100%',
        borderRadius:10,
        overflow:'hidden',
        borderWidth:1, borderColor:"#ffece7",
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25
    },
    wrapDot:{
        position:'absolute',
        bottom:5,
        flexDirection:'row',
        alignSelf:'center'
    },
    dotActive:{
        margin: 3,
        color: "#000",width:7, height:7, borderRadius:7,backgroundColor:"#000"
    },
    dot:{
        margin: 3,
        color: "#fff",width:7, height:7, borderRadius:7,backgroundColor:"#fff"
    }
})
