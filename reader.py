def decode(message_file):
    pyramid_lines = []

    # Read the pyramid lines from the file
    with open(message_file, 'r') as file:
        for line in file:
            pyramid_lines.append(line.strip().split()[1])

    # Construct the decoded message
    decoded_message = " ".join(pyramid_lines)

    return decoded_message

# Example usage:
file_path = "./test.txt"  # Replace with the actual path to your input file
result = decode(file_path)
print(result)