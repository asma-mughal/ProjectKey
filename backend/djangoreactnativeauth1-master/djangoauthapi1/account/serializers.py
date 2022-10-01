from rest_framework import serializers
from account.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util
from django.contrib.auth.hashers import make_password
from . models import Product, Category, Payment, Cart, Order, UserCompetitions, News, Competitions
class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'password', 'password2', 'tc']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name']

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']
  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      link = 'http://192.168.0.102:8000/api/user/reset-password/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      # Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model= Category
    fields=[
      'id',
		'Category_Name',
     'Category_Image', 
     'Category_Price',
		]

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model= Product
		fields=[
		'prod_title',
		'prod_price',
		'prod_quantity',
		'prod_color',
		'prod_image',
		'prod_availability',
		'prod_description',

		]

class PaymentSerializer(serializers.ModelSerializer):
  payment_detail =serializers.CharField(write_only=True,
  required= True, )
  def create(self, validated_data):
    validated_data['payment_detail'] = make_password(validated_data.get('payment_detail'))
    return super(UserProfileSerializer, self).create(validated_data) 
    class Meta:
      model= Payment
      fields=[
        'payment_detail',
        ]
class CartSerializer(serializers.ModelSerializer):
	class Meta:
		model= Cart
		fields=[
		'cart_no_of_items',
		'cart_total',
		]	

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model= Order
		fields=[
		'order_delivery_address',
		'order_delivery_time',
		'order_notes'
		]

class UserCompetitionSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserCompetitions
		fields =[
			'User_FirstName',
			'User_LastName',
			'User_Street_Address',
			'User_Address_Line',
			'User_City',
			'User_State',
			'User_Zip',
			'User_Country',
			'User_email',
			'User_phone',
			'User_Location',
			'User_consent',
		]

class NewsSerializer(serializers.ModelSerializer):
	class Meta:
		model = News
		fields =[
			'News_title',
			'News_type',
			'News_time',
			'News_date',
			'News_image',
			'News_detail',
		]
class CompetitionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Competitions
		fields =[
			'cmp_title',
			'cmp_deadline',
		]