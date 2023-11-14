import React, { useState, useEffect } from 'react';
import { Flex, Text, Icon, Box, VStack, HStack, Image, Button, Input, Textarea, Select } from '@chakra-ui/react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { getRestaurant, updateRestaurantDetails } from '../../services/RestaurantServices/RestaurantService';
// import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';


function restaurant() {
  const { restaurant_id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [inEditingMode, setInEditingMode] = useState(false); 
  const [inEditMenu, setInEditMenu] = useState(false);
  
  const menuDetailTemplate = {
    item_name: '',
    item_description: '',
    category: '',
    item_type: '',
    is_available: true,
    item_qty: 0,
    item_size_price: [
      { size: '', price: 0, type: '' },
    ],
  }
  const [newMenuItemDetail, setNewMenuItemDetail] = useState(menuDetailTemplate);

  useEffect(() => {
    const fetchRestaurantData = async () => {
    // const restaurantResponse = await getRestaurant(restaurant_id);
      const restaurantResponse = {
        "menu": [
            {
                "item_id": 101,
                "item_image_path": "spinach_salad.jpg",
                "item_size_price": [
                    {
                        "size": "Small",
                        "price": 8.99
                    },
                    {
                        "size": "Regular",
                        "price": 12.99
                    }
                ],
                "item_type": "vegetarian",
                "item_name": "Organic Spinach Salad",
                "item_description": "Fresh organic spinach with a balsamic vinaigrette dressing.",
                "category": "Salads",
                "item_qty": 60,
                "is_available": true
            }
        ],
        "online_delivery": true,
        "restaurant_id": "972f782d-40e1-4e61-a251-9c25dbe7cba6",
        "is_open": true,
        "insta_link": "",
        "contact": 9021234567,
        "image_path": "972f782d-40e1-4e61-a251-9c25dbe7cba6.jpg",
        "address": "1707 Grafton St, Halifax, NS",
        "start_time": "11:00",
        "end_time": "12:00",
        "store_link": "https://www.thewoodenmonkey.ca/",
        "name": "The Wooden Monkey",
        "max_booking_capacity": "6033",
        "tagline": "International, Organic, Sustainable",
        "is_new": false,
        "fb_link": "https://www.facebook.com/TheWoodenMonkey/"
    }
      setRestaurant(restaurantResponse);
      console.log(restaurantResponse);
      setLoading(false);
  }
  fetchRestaurantData();
  }, [restaurant_id]);

  const enableEditMode = () => {
    setInEditingMode(true);
  };

  const saveEditChanges = () => {
    updateRestaurantData(restaurant);
    setInEditingMode(false);
  };

  async function updateRestaurantData(restaurant) {
    console.log(restaurant);
    const restaurantResponse = await updateRestaurantDetails(restaurant);
    console.log(restaurantResponse);

  }

  // Menu item helper functions:

  const updateMenuDetailChanges = (itemId, field, value) => {
    const updatedMenu = restaurant.menu.map((item) => item.item_id === itemId ? { ...item, [field]: value } : item);
    setRestaurant({ ...restaurant, menu: updatedMenu });
  };

  const updateSizePrice = (menuItem, index, field, value) => {
    const updatedSizePrice = [...menuItem.item_size_price];
    updatedSizePrice[index] = { ...updatedSizePrice[index], [field]: value };
    updateMenuDetailChanges(menuItem.item_id, 'item_size_price', updatedSizePrice);
    console.log('update size price() , menuItem => ',menuItem);
  };

  const addNewMenuItem = () => {
    // TODO: Replace with UUID
    const newMenuItem = { ...newMenuItemDetail, item_id: Date.now() };
    
    setNewMenuItemDetail(newMenuItem);
    // enable edit mode
    setInEditMenu(true);
  
    // Append the new menu item to the restaurant's menu item list
    setRestaurant((prevRestaurant) => ({ ...prevRestaurant, menu: [...prevRestaurant.menu, newMenuItem] }));
  };

  const enableMenuEditMode  = () => {
    setInEditMenu(true);
  };

  const saveMenuEditChanges = () => {
    setInEditMenu(false);
    console.log(restaurant.menu);
    updateRestaurantData(restaurant);
  };

  // Image upload helper functions:

  const getImageS3PresignedUrl = async (fileName) => {
    try {
      const response = await fetch(
        `YOUR_LAMBDA_ENDPOINT?fileName=${fileName}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch pre-signed URL');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching pre-signed URL:', error);
      throw error;
    }
  };

  const uploadImageToS3 = async (file,item_id) => {
    try {
      const { upload_url } = await getImageS3PresignedUrl(item_id+'.jpg');

      await fetch(upload_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      updateMenuDetailChanges(menuItem.item_id, 'item_image_path', item_id+'.jpg');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const initiateImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadImageToS3(file);
    }
  };

  if (loading) {
    return <div>Loading restaurant details...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

   return (
    <Flex flexDirection="column" alignItems="start" justifyContent="center">
      <Box bg="white" w="100%" rounded="md" mb="5px">
        <Image src={`https://foodvaganza.s3.amazonaws.com/${restaurant_id}/${restaurant.image_path}`} w="100%" h="200px" objectFit="cover" />
      </Box>
      <Flex flexDirection="column" alignItems="start" justifyContent="space-between">
        <Box bg="white" w="100%" mr="45%" ml="45%" rounded="md">
          <Text fontSize="4xl" p="20px" fontWeight="bold"></Text>

          {inEditingMode ? (<Text fontSize="4xl" p="20px" fontWeight="bold">Editing Restaurant details:</Text> ) : ( " " ) }

            {/* Restaurant Name */}
            <Text fontSize="4xl" p="20px" fontWeight="bold">
              {inEditingMode ? (
                <>
                  <span style={{ fontSize:'1xl', display: 'inline-block', width: '190px' }}>Restaurant Name:</span>
                  <Input name="name" value={restaurant.name} onChange={(event) => setRestaurant({ ...restaurant, name: event.target.value })} />
                </>
              ) : (
                restaurant.name
              )}
            </Text>
            <Box bg="white" p="20px" ml="40px" rounded="md">
              {/* Tag line */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Tagline:</span>
                {inEditingMode ? (
                  <Input name="tagline" value={restaurant.tagline} onChange={(event) => setRestaurant({ ...restaurant, tagline: event.target.value })} />
                ) : (
                  restaurant.tagline
                )}
              </Text>
              {/* Address */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Address:</span>
                {inEditingMode ? (
                  <Textarea name="address" value={restaurant.address} onChange={(event) => setRestaurant({ ...restaurant, address: event.target.value })} />
                ) : (
                  restaurant.address
                )}
              </Text>
              {/* Contact number */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Contact:</span>
                {inEditingMode ? (
                  <Input type="number" name="contact" value={restaurant.contact} onChange={(event) => setRestaurant({ ...restaurant, contact: event.target.value })} />
                ) : (
                  restaurant.contact
                )}
              </Text>
              {/* Opening time */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Opening Time:</span>
                {inEditingMode ? (
                  <Input type="time" name="start_time" value={restaurant.start_time} onChange={(event) => {
                      var edittedTime = event.target.value;
                      // removing the AM and PM at the end and getting "HH:MM"
                      edittedTime = edittedTime.substring(0, 5); 
                      setRestaurant({ ...restaurant, start_time: edittedTime })
                    }} 
                  />
                ) : (
                  restaurant.start_time
                )}
              </Text>
              {/* Closing time  */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Closing Time:</span>
                {inEditingMode ? (
                  <Input type="time" name="end_time" value={restaurant.end_time} onChange={(event) => {
                    var edittedTime = event.target.value;
                    // removing the AM and PM at the end and getting "HH:MM"
                    edittedTime = edittedTime.substring(0, 5); 
                    setRestaurant({ ...restaurant, end_time: edittedTime })
                  }} 
                />
                ) : (
                  restaurant.end_time
                )}
              </Text>
              {/* online_delivery */}
              {/* <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Online Delivery:</span>
                {inEditingMode ? (
                  <Select name="online_delivery" value={restaurant.online_delivery} onChange={(event) => setRestaurant({ ...restaurant, online_delivery: event.target.value === 'Yes' })} >
                    <option value="Yes">Available</option>
                    <option value="No">Not Offered</option>
                  </Select>
                ) : (
                  restaurant.online_delivery
                )}
              </Text> */}

              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Online Delivery:</span>
                {inEditingMode ? (
                  <input
                    type="checkbox"
                    name="online_delivery"
                    checked={restaurant.online_delivery}
                    onChange={(event) => setRestaurant({ ...restaurant, online_delivery: event.target.checked })}
                  />
                ) : (
                  restaurant.online_delivery ? 'Yes' : 'No'
                )}
              </Text>


              {/* max_booking_capacity  */}
              {/* <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Max Booking Capacity:</span>
                {inEditingMode ? (
                  <NumberInput type="number" min={5} max={100} name="max_booking_capacity" value={restaurant.max_booking_capacity} onChange={(valueString) => setRestaurant({ ...restaurant, max_booking_capacity: valueString != "NaN" ? parseInt(valueString) : "NA" })} >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                ) : (
                  restaurant.max_booking_capacity
                )}
              </Text> */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Max Booking Capacity:</span>
                {inEditingMode ? (
                  <Input type="number" name="max_booking_capacity" value={restaurant.max_booking_capacity} onChange={(event) => setRestaurant({ ...restaurant, max_booking_capacity: event.target.value })} />
                ) : (
                  restaurant.max_booking_capacity
                )}
              </Text>

              {/* store_link */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Store Link:</span>
                {inEditingMode ? (
                  <Input name="store_link" value={restaurant.store_link} onChange={(event) => setRestaurant({ ...restaurant, store_link: event.target.value })} />
                ) : (
                  restaurant.store_link
                )}
              </Text>
              {/* fb_link  */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Facebook Link:</span>
                {inEditingMode ? (
                  <Input name="fb_link" value={restaurant.fb_link} onChange={(event) => setRestaurant({ ...restaurant, fb_link: event.target.value })} />
                ) : (
                  restaurant.fb_link
                )}
              </Text>
              {/* insta_link  */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Instagram Link:</span>
                {inEditingMode ? (
                  <Input name="insta_link" value={restaurant.insta_link} onChange={(event) => setRestaurant({ ...restaurant, insta_link: event.target.value })} />
                ) : (
                  restaurant.insta_link
                )}
              </Text>
              {/* is Restaurant Open / Operational  */}
              <Text p="5px" fontSize="lg">
                <span style={{ display: 'inline-block', width: '190px' }}>Declaration Restaurant is Open:</span>
                {inEditingMode ? (
                  <input type="checkbox" name="is_open" checked={restaurant.is_open} onChange={(event) => setRestaurant({ ...restaurant, is_open: event.target.checked })} />
                ) : (
                  restaurant.is_open ? 'Yes-Open' : 'No-Closed'
                )}
              </Text>
            
            <Button mt="15px" colorScheme={inEditingMode ? "green" : "purple"} onClick={inEditingMode ? saveEditChanges : enableEditMode}>
              {inEditingMode ? 'Save Changes' : 'Edit Restaurant Details'}
            </Button>
          </Box>

          <Text fontSize="4xl" p="20px" fontWeight="bold"> Menu Items </Text>

          <Box p="20px" ml="40px" rounded="md" w="100%" >
            <Button colorScheme={inEditMenu ? "green" : "purple"} mr="20px"  onClick={inEditMenu ? saveMenuEditChanges : enableMenuEditMode}>{inEditMenu ? 'Save Changes' : 'Edit Menu Details'}</Button>
            <Button colorScheme="purple" onClick={addNewMenuItem}>Add New Menu Item</Button>
          </Box>

        <VStack alignItems="start" spacing="20px" ml="60px">
          {restaurant.menu.map((menuItem) => (
            
            <Box key={menuItem.item_id} bg="white" p="20px" rounded="md" w="100%" border="1px solid #ccc">
              {/* Menu Item Image */}
              <Image src={menuItem.item_image_path !== undefined ? `https://foodvaganza.s3.amazonaws.com/${restaurant_id}/${menuItem.item_image_path}` : `https://foodvaganza.s3.amazonaws.com/default_image.jpg`} alt={menuItem.item_name} w="100%" h="200px" objectFit="cover" />
              
              {inEditMenu ? ( 
                <>
                  <Text fontSize="md" fontWeight="medium" mt="5px">Update item Image:</Text>
                  <input type="file" onChange={initiateImageUpload} />
                </>
              ) : ( "" )}              


              {/* name */}
              {inEditMenu ? ( 
                <>
                  <Text fontSize="md" fontWeight="medium" mt="5px">Item Name:</Text>
                  <Input name="item_name" value={menuItem.item_name || " "} onChange={(e) => updateMenuDetailChanges(menuItem.item_id, 'item_name', e.target.value)} />
                </>
              ) : (
                <Text fontSize="lg" fontWeight="bold">
                  {menuItem.item_name} 
                </Text>
              )}

              {/* Description */}
              {inEditMenu ? (
                <>
                  <Text fontWeight="medium" mt="5px" >Item Description:</Text>
                  <Input name="item_description" value={menuItem.item_description || " "} onChange={(e) => updateMenuDetailChanges(menuItem.item_id, 'item_description', e.target.value)} />                    
                </>
              ) : (
                <Text fontSize="md" mt="5px"> {menuItem.item_description} </Text> 
              )}
              
              {/* Category */}
              <Text p="5px" fontSize="md">
                <span style={{ fontWeight:'var(--chakra-fontWeights-medium)', display: 'inline-block', width: '150px' }}>Category:</span>
                {inEditMenu ? (
                  <Input name="category" value={menuItem.category || " "} onChange={(event) => updateMenuDetailChanges(menuItem.item_id, 'category', event.target.value)} />
                  ) : (
                    menuItem.category
                )}
              </Text>

              {/* Type */}
              <Text p="5px" fontSize="md">
                <span style={{ fontWeight:'var(--chakra-fontWeights-medium)', display: 'inline-block', width: '150px' }}>Type:</span>
                {inEditMenu ? (
                  <Input name="item_type" value={menuItem.item_type || " "} onChange={(event) => updateMenuDetailChanges(menuItem.item_id, 'item_type', event.target.value)} />
                  ) : (
                    menuItem.item_type
                )}
              </Text>

              {/* Availability */}
              <Text p="5px" fontSize="md">
                <span style={{ fontWeight:'var(--chakra-fontWeights-medium)', display: 'inline-block', width: '150px' }}>Item Availability:</span>
                {inEditMenu ? (
                  <input style={{ marginLeft: '10px' }} type="checkbox" name="is_available" checked={menuItem.is_available} onChange={(event) => updateMenuDetailChanges(menuItem.item_id, 'is_available', event.target.checked)} />
                ) : (
                  <>
                    {menuItem.is_available ? (
                      <span style={{ fontSize: 'lg', color: 'green' }}>Available</span>
                    ) : (
                      <span style={{ fontSize: 'lg', color: 'red' }}>Not Available</span>
                    )}
                  </>
                )}
              </Text>
              
              {/* Quantity */}
              <Text p="5px" fontSize="md">
                <span style={{ fontWeight:'var(--chakra-fontWeights-medium)', display: 'inline-block', width: '150px' }}>Quantity:</span>
                {inEditMenu ? (
                  <input style={{ marginLeft: '10px', border:'1px solid #E2E8F0', borderRadius: '5px' }} type="number" name="item_qty" checked={menuItem.item_qty} onChange={(event) => updateMenuDetailChanges(menuItem.item_id, 'item_qty', event.target.value)} />
                ) : (
                  menuItem.item_qty
                )}
              </Text>
              
              <span style={{ padding: '5px', fontSize:'var(--chakra-fontSizes-lg)', display: 'inline', width: '150px' }}>Different Item sizes:</span>
              {inEditMenu ? (
                <VStack mt="10px" spacing="10px">
                  {menuItem.item_size_price.map((sizePrice, index) => (
                    <Box key={sizePrice.size} bg="gray.100" p="10px" rounded="md">
                      {/*  Size  */}
                      <Text fontWeight="md">Item #{index+1}</Text>
                      <Flex alignItems="center">
                        <Text fontSize="md" fontWeight="medium" width="80px">Size:</Text>
                        <Input
                          value={sizePrice.size || ""}
                          placeholder="Size"
                          onInput={(event) => { updateSizePrice(menuItem, index, 'size', event.target.value);}}
                        />
                      </Flex>
                      
                      {/* Price */}
                      <Flex alignItems="center" mt="10px">
                        <Text fontSize="md" fontWeight="medium" width="80px">Price:</Text>
                        <Input value={sizePrice.price.toFixed(2) || ""} type="number" placeholder="Price" onInput={(event) => { updateSizePrice(menuItem, index, 'price', parseFloat(event.target.value) || 0); }} />
                      </Flex>
                      
                      {/* Type  */}
                      <Flex alignItems="center" mt="10px">
                        <Text fontSize="md" fontWeight="medium" width="80px">Type:</Text>
                        <Input value={sizePrice.type || ""} placeholder="Type" onInput={(event) => { updateSizePrice(menuItem, index, 'type', event.target.value); }} />
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <HStack mt="10px" spacing="10px">
                  {menuItem.item_size_price.map((sizePrice) => (
                    <Box key={sizePrice.size} bg="gray.100" p="10px" rounded="md">
                      <Text fontSize="lg" fontWeight="bold">{sizePrice.size}</Text>
                      <Text>{`$${sizePrice.price.toFixed(2)}${sizePrice.type ? ` per ${sizePrice.type}` : ''}`}</Text>
                    </Box>
                  ))}
                </HStack>
              )}
            </Box>
          ))}
        </VStack>

        <Box p="20px" ml="40px" rounded="md" w="100%" >
          <Button colorScheme={inEditMenu ? "green" : "purple"} mr="20px"  onClick={inEditMenu ? saveMenuEditChanges : enableMenuEditMode}>{inEditMenu ? 'Save Changes' : 'Edit Menu Details'}</Button>
          <Button colorScheme="purple" onClick={addNewMenuItem}>Add New Menu Item</Button>
        </Box>


        </Box>

        <Box ml="auto" mt="20px">
          <NavLink to="/restaurants" p="20px">
            <Icon as={BsArrowLeft} color='blackAlpha.900' boxSize={6} /> Back to Restaurant List
          </NavLink>
        </Box>
        <Box mt="50px" h="150px"></Box>
      </Flex>
    </Flex>
  );
}

export default restaurant;

function updateItemsInMenu(menu, itemId, updatedItem) {
  return menu.map((item) => (item.item_id === itemId ? updatedItem : item));
}
