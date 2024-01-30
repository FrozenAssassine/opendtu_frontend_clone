import asyncio
import websockets

async def connect_to_websocket_server():
    async with websockets.connect('ws://localhost:5100') as websocket:
        # Send a message to the server
        await websocket.send('Hello, server!')

        # Receive a message from the server
        response = await websocket.recv()
        print(f'Received message from server: {response}')

asyncio.run(connect_to_websocket_server())
