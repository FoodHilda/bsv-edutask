#python3 -m pytest test/test_get_user_by_email.py

import pytest
from unittest.mock import MagicMock
from src.controllers.usercontroller import UserController

#create mock database 
@pytest.fixture
def mock_dao():
    return MagicMock()

#create mock UserController that is linked to the mock database
@pytest.fixture
def controller(mock_dao):
    return UserController(dao=mock_dao)

def test_valid_email_single_user(controller, mock_dao):
    #define mock user
    mock_user = {"email": "user@example.com"}
    #set the mock database to return the mock user
    mock_dao.find.return_value = [mock_user]
    #check return value
    assert controller.get_user_by_email("user@example.com") == mock_user

def test_valid_email_multiple_users_part1(controller, mock_dao, capsys):
    mock_users = [{"email": "user@example.com"}, {"email": "user@example.com"}]
    #set the mock database to return the previously defined users
    mock_dao.find.return_value = mock_users
    controller.get_user_by_email("user@example.com")
    captured = capsys.readouterr()
    #assert result == mock_users[0]
    assert "more than one user found" in captured.out

def test_valid_email_multiple_users_part2(controller, mock_dao, capsys):
    mock_users = [{"email": "user@example.com"}, {"email": "user@example.com"}]
    mock_dao.find.return_value = mock_users
    result = controller.get_user_by_email("user@example.com")
    #captured = capsys.readouterr()
    assert result == mock_users[0]
    #assert "more than one user found" in captured.out

def test_valid_email_no_user(controller, mock_dao):
    #set the mock database to return to empty
    mock_dao.find.return_value = []
    #check return value
    assert controller.get_user_by_email("nouser@example.com") is None

def test_invalid_email(controller):
    #check if a value error is raised
    with pytest.raises(ValueError):
        controller.get_user_by_email("invalid-email")

def test_dao_exception(controller, mock_dao):
    #set the mock database to return an exception
    mock_dao.find.side_effect = Exception("DB error")
    #check if an exception is raised
    with pytest.raises(Exception):
        controller.get_user_by_email("user@example.com")
