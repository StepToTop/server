import zmq from 'zeromq';

const sock = zmq.socket('pub');
sock.bindSync('tcp://*:9528');
