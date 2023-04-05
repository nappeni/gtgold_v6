import React, { useEffect } from 'react'
import {
    SafeAreaView,
    ActivityIndicator,
    View,
    Dimensions,
    Text,
    Alert,
    BackHandler,
} from 'react-native'
import IMP from 'iamport-react-native'

const PaymentPage = (props) => {
    const { route, navigation } = props
    const { params } = route

    const Loading = () => (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
            }}
        >
            <ActivityIndicator color="#0085CA" size={'large'} />
        </View>
    )
    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
        pg: params.pg,
        pay_method: params.pay_method,
        name: `${params?.name} `,
        merchant_uid: `${params.merchant_uid}`, //상품 조회 키값으로 설정
        amount: params.amount,
        buyer_name: params.buyer_name,
        buyer_tel: params.buyer_tel,
        buyer_email: params.buyer_email,
        buyer_addr: params.buyer_addr,
        buyer_postcode: '',
        app_scheme: 'palroinApp',
        customer_uid: params?.customer_uid,
        digital: false,
        m_redirect_url: params.m_redirect_url,
    }

    const callback = (response) => {
        // console.log(response);
        const params = {
            response,
            type: 'payment',
        }

        if (response) {
            navigation.replace('HomePage', params)
        }
    }

    const backAction = () => {
        Alert.alert('결제를 취소하시겠습니까?', '', [
            {
                text: '네',
                onPress: () => navigation.goBack(),
            },
            { text: '아니요' },
        ])
        return true
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction)
    })

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: '#fff' }]}>
            <IMP.Payment
                userCode={params?.usercode}
                loading={<Loading />}
                data={{
                    ...data,
                    app_scheme: 'palroinApp',
                }}
                callback={callback}
            />
        </SafeAreaView>
    )
}

export default PaymentPage
