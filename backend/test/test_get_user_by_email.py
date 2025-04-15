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

def test_valid_email_multiple_users(controller, mock_dao, capsys):
    #define multiple mock users
    mock_users = [{"email": "user@example.com"}, {"email": "user@example.com"}]
    #set the mock database to return the previously defined users
    mock_dao.find.return_value = mock_users
    #get return value
    result = controller.get_user_by_email("user@example.com")
    #capture what was printed
    captured = capsys.readouterr()
    #check return value
    assert result == mock_users[0]
    #check if anything was printed
    assert "more than one user found" in captured.out

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
