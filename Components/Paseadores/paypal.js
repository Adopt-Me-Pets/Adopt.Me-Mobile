// import React, { useState, useEffect } from 'react';
// import { Button, Modal, View, WebView } from 'react-native';
// import { RNPaypal, PayPal } from 'react-native-paypal';

// const PayPal2 = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [approvalUrl, setApprovalUrl] = useState(null);

//   useEffect(() => {
//     RNPaypal.initialize({
//       clientId: 'AepMvsHW9420KwIdXjAAuouf-r5gHHpLg9wPQlg_FEdw7tQQanBRmhANDyOg502aA8Ui0-o3wDJWjvsc',
//       environment: RNPaypal.ENVIRONMENT_LIVE,
//     })
//       .then(() => {
//         console.log('PayPal SDK initialized successfully');
//       })
//       .catch((error) => {
//         console.log('Failed to initialize PayPal SDK:', error);
//       });
//   }, []);

//   const handlePayment = async () => {
//     try {
//       const { billingAgreementID, approvalUrl } = await PayPal.initialize({
//         clientId: 'AepMvsHW9420KwIdXjAAuouf-r5gHHpLg9wPQlg_FEdw7tQQanBRmhANDyOg502aA8Ui0-o3wDJWjvsc',
//         environment: PayPal.LIVE,
//         paymentOptions: {
//           requestBillingAgreement: true,
//           billingAgreementDescription: 'Your Subscription Description',
//           billingAgreementType: PayPal.BILLING_AGREEMENT_TYPE_PLAN,
//           billingPlanId: 'P-4TT05931ST8244137MPEHRNA',
//         },
//       });

//       setApprovalUrl(approvalUrl);
//       setModalVisible(true);
//     } catch (error) {
//       console.error('Error initializing PayPal:', error);
//     }
//   };

//   return (
//     <>
//       <Button title="Contratar" onPress={handlePayment} />
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={{ flex: 1 }}>
//           <WebView
//             source={{ uri: approvalUrl }}
//             onNavigationStateChange={(event) => {
//               if (event.url.includes('http://192.168.100.18:19001/HomePage')) {
//                 setModalVisible(false);
//               }
//             }}
//           />
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default PayPal2;
