-- MySQL Workbench Compatible Schema

CREATE DATABASE IF NOT EXISTS ashok_nagar_rooms;
USE ashok_nagar_rooms;

-- Table for Leads
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    budget VARCHAR(50) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    is_new BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Properties
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data for Properties
INSERT INTO properties (title, price, type, location, image_url) VALUES 
('Premium 1BHK Flat', '12,500', '1BHK', 'Block B, New Ashok Nagar', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400'),
('Spacious 1RK', '7,500', '1RK', 'New Ashok Nagar Metro', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400'),
('Luxurious 2BHK', '18,500', '2BHK', 'Pocket D, New Ashok Nagar', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400');
